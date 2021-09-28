import getProducts from "../api/products.js";

const filters = {
  namespaced: true,
  // Når man nå kaller den, så kaller man med filters/navnet på den metoden man skal ha

  // MUTATION er veldig spesifikk, eks dekrementere antall, endre navn
  /* EN ACTION ER HELE PROSEDYRA (legg i handlekurv) action er serie med mutations */
  // både actions og mutations kan man lytte på. ofte lytter man på actions.

  state() {
    return {
      filters: [],
    };
  },

  getters: {
    values(state, getters, rootState) {
      // name under er en funksjon, som de utenfra kan kalle. name kommer fra det kallende stedet.
      return function(name) {
        let filter = state.filters.find(function(f) {
          return f.name === name;
        });
        return filter ? filter.values : undefined;
      };
    },
    filters(state) {
      return state.filters;
    },
    queryString(state, getters, rootState) {
      let queries = state.filters
        .filter(function(f) {
          return f.values.length;
        })
        .map(function(f) {
          // LAGT TIL AV ROGER 28.09 for å få dropdown <select> <option> til å fungere
          // console.log(f.values);
          if (!Array.isArray(f.values)) {
            f.values = [f.values]
          }
          // SLUTT LAGT TIL AV ROGER
          return f.values
            .map(function(v) {
              return f.name.toLowerCase() + "=" + encodeURI(v);
            })
            .join("&");
        });
      return queries.length ? "?" + queries.join("&") : "";
    },
  },

  actions: {
    init(context) {
      getProducts.getFilters().then((filters) => {
        let urlParams = window.location.search
          .replace("?", "")
          .split("&")
          .map(function(str) {
            let parts = str.split("=");
            return { name: parts[0], value: decodeURI(parts[1]) };
          });

        let newFilters = context.state.filters.slice(0);
        // console.log(filters.fields);

        filters.fields.forEach(function(filter) {
          if (
            !newFilters.find(function(f) {
              return f.name === filter.name;
            })
          ) {
            let params = urlParams.filter(function(param) {
              return param.name.toLowerCase() === filter.name.toLowerCase();
            });
            newFilters.push({
              name: filter.name,
              values: params.map(function(param) {
                return param.value;
              }),
              availableValues: filter.availableValues,
            });
          }
        });

        context.commit("update", newFilters);
      });
      // + error-handling
    },

    set(context, filter) {
      context.commit("set", filter);

      if (history) {
        let url =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          context.getters.queryString;
        history.replaceState(null, null, url);
      }
    },
  },

  mutations: {
    update(state, filters) {
      state.filters = filters;
    },

    set(state, filter) {
      let index = state.filters.findIndex(function(f) {
        return f.name === filter.name;
      });
      if (index >= 0) {
        filter.availableValues = state.filters[index].availableValues;
        state.filters.splice(index, 1, filter);
      }
      //    else
      //        state.filters.push(filter);
    },
  },
};

export default filters;
