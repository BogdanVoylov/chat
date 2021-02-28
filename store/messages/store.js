import { createStore } from 'vuex';
const store = createStore({
  state() {
    return {
      recipient: '',
      messages: []
    };
  }
});
export default store;
