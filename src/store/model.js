import {BleManager} from 'react-native-ble-plx';
import {action, thunk, debug} from 'easy-peasy';
import {decode, encode} from 'base-64';
import axios from 'axios';

/*
  TRACE:: #A1.1.2 -> State management in application.
  TRACE:: #A1.1.3 -> Low energy bluetooth connection to speak with the robot.
*/

// URL
const API_POST_URL = 'https://leather-batend.herokuapp.com/api/avoidance';
const API_GET_URL = 'https://leather-batend.herokuapp.com/api/session';
const API_KEY = 'sdfasdfasdfasdfa';
const AXIOS_CONFIG = {
  headers: {
    api_key: API_KEY,
  },
};

// UUIDS
const ROBOT_SERVICE_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb';
const ROBOT_READ_CHARACTERISTIC_UUID = '0000ffe2-0000-1000-8000-00805f9b34fb';
const ROBOT_WRITE_CHARACTERISTIC_UUID = '0000ffe3-0000-1000-8000-00805f9b34fb';
const ROBOT_NAME = 'Makeblock_LE001b1065fcc3';

// Status enum
const STATUS_INIT = 'INIT';
const STATUS_SCANNING = 'SCANNING';
const STATUS_VERIFYING = 'VERIFYING';
const STATUS_CONNECTED = 'CONNECTED';
const STATUS_ERROR = 'ERROR';

const MOTOR_START_VALUE = 5;

const bluetooth = {
  driveState: 0,
  manager: null,
  device: null,
  status: STATUS_INIT,
  errorMsg: null,
  data_debug: [],
  leftMotor: MOTOR_START_VALUE,
  rightMotor: MOTOR_START_VALUE,
  lineSensor: null,
  motionSensor: null,
  buffer: '',
  initBluetooth: thunk((state, payload, helpers) => {
    // Fetch local state
    const {buffer} = helpers.getState();

    // Setup bluetooth manager
    const manager = new BleManager();

    // Search for robot and connect.
    manager.startDeviceScan(null, null, (error, device) => {
      state.setStatus(STATUS_SCANNING);
      if (error) {
        console.log(error);
        state.errorMsg = 'error in startDeviceScan';
        state.setStatus(STATUS_ERROR);
      } else {
        if (device.name === ROBOT_NAME) {
          manager.stopDeviceScan();
          // We found the device, connect to it (and subscribe to events etc)
          device
            .connect()
            .then((device) => {
              state.setStatus(STATUS_VERIFYING);
              device
                .discoverAllServicesAndCharacteristics()
                .then((device) => {
                  state.setStatus(STATUS_CONNECTED);
                  state.setDevice(device);
                  // Subscribe to writes from robot
                  device.monitorCharacteristicForService(
                    ROBOT_SERVICE_UUID,
                    ROBOT_READ_CHARACTERISTIC_UUID,
                    (err, characteristic) => {
                      if (err) {
                        console.error(err);
                        state.errorMsg = 'error monitor characteristics';
                        state.setStatus(STATUS_ERROR);
                      } else {
                        const data = characteristic.value;
                        let decodedData = decode(data).split('');

                        // Buffer loop
                        let tempBuffer = buffer;
                        decodedData.forEach((dChar) => {
                          tempBuffer += dChar;
                          if (dChar == ';') {
                            state.prepareToReceiveData(tempBuffer);
                            tempBuffer = '';
                          }
                        });

                        state.setBuffer(tempBuffer);
                      }
                    },
                  );
                  // Set manager.
                  state.setManager(manager);
                })
                .catch((err) => {
                  console.error(err);
                  state.errorMsg = 'error device discover services/chars';
                  state.setStatus(STATUS_ERROR);
                });
            })
            .catch((err) => {
              console.error(err);
              state.errorMsg = 'error device connect';
              state.setStatus(STATUS_ERROR);
            });
        }
      }
    });
  }),
  prepareToReceiveData: thunk((state, decodedData) => {
    // Debug
    state.addToData_debug(decodedData);

    // Remove end and start
    decodedData = decodedData.substring(1, decodedData.length - 1);

    const type = decodedData[0];

    decodedData = decodedData.substring(1, decodedData.length);
    const args = decodedData.split(',');

    console.log('COMMAND TYPE: ', type, ' ARGS: ', args);

    switch (type) {
      case 's':
        // Informing the user that the robot avoided something
        // update sensor value state
        // Check if the value is above a certain number,
        // Check if 0 or 1
        state.setLineSensor(parseInt(args[1]));
        state.setMotionSensor(args[0]);
        break;
      case 'p':
        const position = {x: args[0], y: args[1]};
        const flag = args[2];
        state.sendPositionToBackEnd({flag, position});
        break;
      case 'd':
        state.sendCommandToRobot(':d4;');
        break;
      default:
        console.log("ERROR, GOT A NUMTYPE WE DON'T CONTROL");
        break;
    }
  }),
  setManager: action((state, manager) => {
    state.manager = manager;
  }),
  setStatus: action((state, status) => {
    state.status = status;
  }),
  setDevice: action((state, device) => {
    state.device = device;
  }),
  setDriveState: action((state, newState) => {
    state.driveState = newState;
  }),
  addToData_debug: action((state, data) => {
    state.data_debug.push(data);
  }),
  setMotor: action((state, {left, value}) => {
    if (left) state.leftMotor = value;
    else state.rightMotor = value;
  }),
  setLineSensor: action((state, newSensorVal) => {
    if (newSensorVal != state.lineSensor) {
      state.lineSensor = newSensorVal;
    }
  }),
  setMotionSensor: action((state, newSensorVal) => {
    if (newSensorVal != state.motionSensor) state.motionSensor = newSensorVal;
  }),
  setBuffer: action((state, newBuffer) => {
    state.buffer = newBuffer;
  }),

  /*
  TRACE:: #A1.2.6 -> Bluetooth commands for sending the user inputs
  */

  sendCommandToRobot: action((state, message) => {
    const manager = state.manager;
    const device = state.device;
    const base64EncodedMsg = encode(message);
    manager.writeCharacteristicWithoutResponseForDevice(
      device.id,
      ROBOT_SERVICE_UUID,
      ROBOT_WRITE_CHARACTERISTIC_UUID,
      base64EncodedMsg,
    );
  }),
  sendCommand: thunk((state, {d, lm, rm}) => {
    if (lm === undefined || rm === undefined)
      return state.sendCommandToRobot(`:d${d};`);
    const clm = (100 + lm) * 2;
    const crm = (100 + rm) * 2;
    console.log(`MOTOR VALUES SENT TO ROBOT, LEFT: ${clm}, RIGHT: ${crm} `);
    state.sendCommandToRobot(`:l${clm},r${crm};`);
  }),
  sendPositionToBackEnd: thunk(async (state, {flag, position}) => {
    const data = {
      avoidance: {
        position,
        flag,
        date: Date(),
      },
    };
    await axios.post(API_POST_URL, data, AXIOS_CONFIG);
  }),
};

export default {
  bluetooth,
};
