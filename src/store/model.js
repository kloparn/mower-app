import {action} from 'easy-peasy';

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

const STATUS_INIT = 'INIT';
const STATUS_DISCONNECTED = 'DISCONNECTED';
const STATUS_CONNECTED = 'CONNECTED';

const bluetooth = {
  manager: null,
  status: STATUS_INIT,
  initBluetooth: action((state) => {}),
  setManager: action((state, manager) => {
    state.manager = manager;
  }),
};

/*const positions = {

};*/

export default {
  users,
  bluetooth,
};
