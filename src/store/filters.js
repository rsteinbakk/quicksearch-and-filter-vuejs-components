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
    // Er det behov for rootState her?
    values(state, getters, rootState) {
      // name under er en funksjon, som de utenfra kan kalle. name kommer fra det kallende stedet.
      return function(name) {
        let filter = state.filters.find(function(f) {
          return f.name === name;
          // Looper i gjennom filters array, og returnerer det som er likt med parameter name. Hvor kommer parameter name fra?
        });
        return filter ? filter.values : undefined;
        // Skjønner jeg denne riktig? Hvis filter er true, returneres filter.values, ellers returneres undefined
      };
    },
    filters(state) {
      return state.filters;
    },
    queryString(state, getters, rootState) {
      let queries = state.filters
        // SLETTE START
        // .filter(function(f) {
        //   return f.values.length;
        // })
        // Kan vi oppdatere kommentert kode over til es6 (under)? Funker på samme måte?
        // SLETTE SLUTT
        .filter((f) => f.values.length)
        // Til info: kommer ikke feilmelding, hvis f.values.length ikke funker, skal jeg gjøre noe med det?
        .map(function(f) {
          // LAGT TIL AV ROGER 28.09.21 for å få dropdown <select> <option> til å fungere se  eks. console.log(f.values)
          if (!Array.isArray(f.values)) {
            f.values = [f.values];
          }
          // SLUTT LAGT TIL AV ROGER 28.09.21
          return (
            f.values
              // SLETTE START
              // .map(function(v) {
              //   return f.name.toLowerCase() + "=" + encodeURI(v);
              // })
              // SLETTE SLUTT
              .map((v) => f.name.toLowerCase() + "=" + encodeURI(v))
              // hva brukes encodeURI til her?
              .join("&")
          );
        });
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
