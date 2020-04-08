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

const bluetooth = {
  manager: null,
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
