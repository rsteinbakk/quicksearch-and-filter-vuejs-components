import productsApi from "../api/products.js";

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
      return function(name) {
        let filter = state.filters.find((f) => f.name === name);
        return filter ? filter.values : undefined;
      };
    },
    filters(state) {
      return state.filters;
    },
    queryString(state, getters, rootState) {
      let queries = state.filters
        .filter((f) => f.values.length)
        .map((f) =>
          f.values
            .map((v) => f.name.toLowerCase() + "=" + encodeURI(v))
            .join("&")
        );
      return queries.length ? "?" + queries.join("&") : "";
    },
  },

  actions: {
    init(context) {
      productsApi.getFilters().then((filters) => {
        let urlParams = window.location.search
          .replace("?", "")
          .split("&")
          .map(function(str) {
            let parts = str.split("=");
            return { name: parts[0], value: decodeURI(parts[1]) };
          });

        let newFilters = context.state.filters.slice(0);
        //  newFilters Lager en kopi av filters-arrayet.

        filters.fields.forEach((filter) => {
          if (!newFilters.find((f) => f.name === filter.name)) {
            // Hvis det ikke finnes et filter med dette navnet, legges det til.
            let params = urlParams.filter(
              // Tar ut alle parameterene som matcher navnet.
              (param) => param.name.toLowerCase() === filter.name.toLowerCase()
            );
            newFilters.push({
              name: filter.name,
              label: filter.label,
              availableValues: filter.availableValues,
              values: params.map((param) => param.value),
              // values er de faktisk valgte verdiene (filtrert ut fra urlen)
            });
          }
        });
        // Endringene gjøres på kopi, her blir kopien satt til å bli gjeldende
        context.commit("update", newFilters);
      });
    },

    // Fremtidig mål: Ønsker ikke å overskrive filter her, men sjekke navn og oppdatere eksisterende filter.

    set(context, filter) {
      context.commit("set", filter);
      // Hvor kommer history argumentet fra?
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
      let index = state.filters.findIndex((f) => f.name === filter.name);
      if (index >= 0) {
        filter.availableValues = state.filters[index].availableValues;
        filter.label = state.filters[index].label;
        state.filters.splice(index, 1, filter);
      }
      // else
      // state.filters.push(filter);
    },
  },
};

export default filters;
