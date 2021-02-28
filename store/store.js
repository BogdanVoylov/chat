import { createStore } from 'vuex';
import messages from './messages/store';
import users from './users/store';
const store = createStore({
  modules: {
    messages,
    users
  }
});

export default store;
