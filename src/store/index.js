import { createStore } from 'vuex'
const store = createStore({
  state: {
    last_game: ""
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
    save_last_game(state, game_id) {
      state.last_game = game_id;
    }
  },
  actions: {},
  modules: {},
});
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
