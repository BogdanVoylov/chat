import { createStore } from 'vuex';
const store = createStore({
  state: () => ({
    users: [],
    me: {}
  }),
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setMe(state, me) {
      state.me = me;
    }
  },
  getters: {
    users(state) {
      return state.filter(u => u != store.me);
    },
    me(state) {
      return state.me;
    }
  }
});
export default store;
