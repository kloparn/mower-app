import {BleManager} from 'react-native-ble-plx';
import {action, thunk} from 'easy-peasy';
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

const bluetooth = {
  manager: null,
  status: STATUS_INIT,
  errorMsg: null,
  data_debug: [],
  initBluetooth: thunk((state) => {
    // Setup bluetooth manager
    const manager = new BleManager();

    // Search for robot and connect.
    manager.startDeviceScan(null, null, (error, device) => {
      state.setStatus(STATUS_SCANNING);
      console.log('Scanning for robot...');
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
              device.discoverAllServicesAndCharacteristics();
            })
            .then((device) => {
              console.log('device post services', device);
              state.setStatus(STATUS_CONNECTED);
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
                    state.addToData_debug(data);
                  }
                },
              ); // DO THIS
              // Do more stuff here.
            })
            .catch((err) => {
              console.error(err);
              state.errorMsg = 'error device connect';
              state.setStatus(STATUS_ERROR);
            });
        }
      }
    });

    state.setManager(manager);
  }),
  setManager: action((state, manager) => {
    state.manager = manager;
  }),
  setStatus: action((state, status) => {
    state.status = status;
  }),
  addToData_debug: action((state, data) => {
    state.data_debug.push(data);
  }),
  sendCommandToRobot: action((state, message) => {
    const base64EncodedMsg = encode(message);
    state.manager.writeCharacteristicWithResponseForService(
      ROBOT_SERVICE_UUID,
      ROBOT_WRITE_CHARACTERISTIC_UUID,
      base64EncodedMsg,
    );
  }),
};

/*const positions = {

};*/

export default {
  bluetooth,
};
