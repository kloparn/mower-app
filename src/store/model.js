import {BleManager} from 'react-native-ble-plx';
import {action, thunk} from 'easy-peasy';

// Temp
const users = {
  items: [
    {
      id: '1',
      name: 'anton',
    },
    {
      id: '2',
      name: 'adama',
    },
    {
      id: '3',
      name: 'dissarn',
    },
    {
      id: '4',
      name: 'rumpa',
    },
  ],
};

// UUIDS
const ROBOT_UUID_CONNECT = '0000ffe1-0000-1000-8000-00805f9b34fb';
const ROBOT_UUID_SEND = '0000ffe3-0000-1000-8000-00805f9b34fb';

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
        if (device.id === ROBOT_UUID_CONNECT) {
          manager.stopDeviceScan();

          // We found the device, connect to it (and subscribe to events etc)
          device
            .connect()
            .then((device) => {
              state.setStatus(STATUS_VERIFYING);
              device.discoverAllServicesAndCharacteristics();
            })
            .then((device) => {
              state.setStatus(STATUS_CONNECTED);
              // Subscribe to writes from robot
              device.monitorCharacteristicForService(device.id); // DO THIS
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
  sendCommandToRobot: action((state, message) => {
    const base64EncodedMsg = btoa(message);
    state.manager.writeCharacteristicWithResponseForService(
      'UUID OF BLE SERVICE',
      'UUID OF BLE CHARACTERISTIC',
      base64EncodedMsg,
    );
  }),
};

/*const positions = {

};*/

export default {
  users,
  bluetooth,
};
