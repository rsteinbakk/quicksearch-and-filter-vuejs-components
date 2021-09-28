import { createStore } from "vuex";
import filtersModule from "./filters.js";

// const counterModule = {
//   state() {
//     return {
//       counter: 0,
//     };
//   },
//   mutations: {
//     increment(state) {
//       state.counter++;
//     },
//   },
  
// };

// Create a new store instance.

const store = createStore({
  modules: {
    // numbers: counterModule,
    filters: filtersModule,
  },
  state() {
    return {};
  },
  mutations: {},
  getters: {},
});

// https://next.vuex.vuejs.org/guide/getters.html

export default store;
