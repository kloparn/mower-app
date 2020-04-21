/*
  TRACE:: #A1.1.2 -> State management in application.
*/
import {BleManager} from 'react-native-ble-plx';
import {action, thunk, debug} from 'easy-peasy';
import {decode, encode} from 'base-64';

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

const MOTOR_START_VALUE = 90;

/*
  TRACE:: #A1.1.3 -> Low energy bluetooth connection to speak with the robot.
*/
const bluetooth = {
  manager: null,
  device: null,
  status: STATUS_INIT,
  errorMsg: null,
  data_debug: [],
  leftMotor: MOTOR_START_VALUE,
  rightMotor: MOTOR_START_VALUE,
  initBluetooth: thunk((state, payload, helpers) => {
    // Setup bluetooth manager
    /*const store = helpers.getStoreState();
    const manager = store.manager;
    console.log('this is le manager: ', debug(manager));*/

    const manager = new BleManager();

    // Search for robot and connect.
    manager.startDeviceScan(null, null, (error, device) => {
      state.setStatus(STATUS_SCANNING);
      //console.log('Scanning for robot...');
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
              console.log('device pre services', device);
              state.setStatus(STATUS_VERIFYING);
              device
                .discoverAllServicesAndCharacteristics()
                .then((device) => {
                  console.log('device post services', device);
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
                        console.log('characteristic', data);
                        state.addToData_debug(decode(data));
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
  setManager: action((state, manager) => {
    state.manager = manager;
  }),
  setStatus: action((state, status) => {
    state.status = status;
  }),
  setDevice: action((state, device) => {
    state.device = device;
  }),
  addToData_debug: action((state, data) => {
    state.data_debug.push(data);
  }),
  setMotor: action((state, {left, value}) => {
    if (left) state.leftMotor = value;
    else state.rightMotor = value;
  }),
  /*
  TRACE:: #A1.2.6 -> Bluetooth commands for sending the user inputs
  */
  sendCommandToRobot: action((state, message) => {
    const manager = state.manager;
    const device = state.device;
    //console.log('SENDMANAGER: ', debug(manager));
    const base64EncodedMsg = encode(message);
    console.log('MSG: ', message);
    console.log('ENCODED MSG: ', base64EncodedMsg);
    manager.writeCharacteristicWithoutResponseForDevice(
      device.id,
      ROBOT_SERVICE_UUID,
      ROBOT_WRITE_CHARACTERISTIC_UUID,
      base64EncodedMsg,
    );
  }),
  sendCommand: thunk((state, {d, lm, rm}) => {
    console.log('LEFT MOTOR: ', lm);
    console.log('RIGHT MOTOR: ', rm);
    if (lm === undefined || rm === undefined)
      state.sendCommandToRobot(`:d${d};`);
    else state.sendCommandToRobot(`:d${d}, l${lm}, r${rm};`);
  }),
};

/*const positions = {

};*/

export default {
  bluetooth,
};
