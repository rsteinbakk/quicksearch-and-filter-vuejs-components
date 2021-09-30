import { createStore } from "vuex";
import filtersModule from "./filters.js";

const store = createStore({
  modules: {
    filters: filtersModule,
  },
  state() {
    return {};
  },
  mutations: {},
  getters: {},
});

export default store;
