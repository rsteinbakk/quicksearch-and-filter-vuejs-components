<template>
  <!-- <QuickSearch
        :baseUrl="'https://www.seljordvarme.no/nettbetaling/search/suggest/'"
        :price="true"
      ></QuickSearch> -->
  <!-- Lag et input felt Når det kommer input, kjøres suggest-url feks
      https://www.seljordvarme.no/nettbetaling/search/suggest/ovn hvis det er
      tekst i feltet, hvis det ikke er tekst i feltet -->
  <div class="search-field">
    <input
      type="text"
      v-model="quickSearchInput"
      class="search-input"
      @input="quickSearch(this.quickSearchInput)"
      @focus="
        darken = true;
        results = false;
      "
      @click="quickSearch(this.quickSearchInput)"
      @keydown.esc="
        darken = false;
        results = false;
      "
    />
    <transition name="result">
      <div class="result" v-if="results">
        <!-- RESULTATER -->
        <ul
          v-for="(result, index) in quickSearchResult"
          :key="index"
          @click.stop
        >
          <li class="result-item">
            <div>
              <div>{{ result.name }}</div>
              <div class="result-category">
                {{ result.category }} 
              </div>
            </div>
            <div class="price">359,-</div>
          </li>
          <hr />
        </ul>
        <div class="all-products">
          <a href="#" v-if="quickSearchResult.length"
            >Vis alle søkeresultater</a
          >
        </div>

        <h4 v-if="Object.entries(quickSearchResultCategories).length !== 0">
          Kategorier:
        </h4>
        <div
          v-for="(result, index) in quickSearchResultCategories"
          :key="index"
          @click.stop
        >
          <div class="result-item" style="display: block">
            {{ index }} <small>({{ result }})</small>
          </div>
          <hr />
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="darken"
        class="darken"
        @click="
          darken = false;
          results = false;
        "
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    selectedWidth: {
      type: Number,
      default: 100,
    },
    baseUrl: {
      type: String,
      default: "https://www.seljordvarme.no/nettbetaling/search/suggest/",
    },
  },
  data() {
    return {
      quickSearchInput: "",
      quickSearchResult: [],
      quickSearchResultCategories: {},
      darken: false,
      results: false,
    };
  },
  methods: {
    quickSearch(keyword) {
      if (keyword === "") {
        this.quickSearchResultCategories = {};
      }
      this.results = true;
      this.darken = true;
      const that = this;
      fetch(that.baseUrl + keyword)
        .then((response) => response.json())
        .then((data) => {
          that.quickSearchResult = data.result;
          that.splitCategories(data.result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    splitCategories(array) {
      if (array.length) {
        console.log(array);
        let categoriesArray = [];
        array.forEach((array) => {
          const splittedCat = array.category.split(", ");
          splittedCat.forEach((category) => {
            categoriesArray.push(category);
          });
        });
        // console.log(categoriesArray);
        this.countReducedCategories(categoriesArray);
      }
    },
    countReducedCategories(array) {
      if (array.length) {
        console.log(array);
        const occurrences = array.reduce(function (acc, curr) {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        }, {});

        this.quickSearchResultCategories = occurrences;
      }
    },
  },
};
</script>

<style scoped>
ul {
  all: unset;
}
li {
  list-style-type: none;
}

* {
  text-align: left;
  box-sizing: border-box;
}
.search-field {
  position: absolute;
  min-width: 30px;
}
.search-input {
  position: relative;
  z-index: 10;
}

.result-category {
  font-size: 0.8rem;
}

input[type="text"] {
  all: unset;
  background-color: white;
  position: relative;
  z-index: 10;
  padding: 7px;
  /* border-radius: 5px; */
  width: calc(100% - 14px);
  margin: 0;
}
/* input[type="text"]:focus {
  border-radius: 5px 5px 0 0;
} */

.result {
  position: relative;
  margin: 0;
  top: 0;
  left: 0;
  z-index: 10;
  min-width: min-content;
  overflow-y: auto;
  padding: 5px;
  background-color: rgb(255, 255, 255);
  border-radius: 0 0 5px 5px;
  max-height: 60vh;
}

.result-item {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.1s ease;
  padding: 6px 5px;
}
.result-item:hover {
  background-color: rgb(235, 235, 235);
}
hr {
  margin: 4px;
  width: 97%;
  height: 1px;
  border: none;
  background-color: rgb(238, 238, 238);
}
ul {
  margin-top: 0;
}
.price {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin: 0 5px;
}
.all-products {
  font-size: 0.9rem;
  padding: 5px 0;
}

/* EFFEKTOVERGANGER */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.result-enter-active,
.result-leave-active {
  transition: transform 0.3s ease;
}
.result-enter-from,
.result-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.darken {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.37);
}
.in-stock {
  width: 10px;
  height: 5px;
  color: green;
}

@media only screen and (max-width: 600px) {
}
</style>        