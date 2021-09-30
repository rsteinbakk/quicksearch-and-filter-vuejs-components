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
      <div class="result" v-if="results && quickSearchResult.length">
        <!-- RESULTATER -->
        <ul
          v-for="(result, index) in quickSearchResult"
          :key="index"
          @click.stop
        >
          <li>
            <div class="result-item">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.in%2Fdemo%2Fimage_upload_and_generate_thumbnail_using_ajax_in_php%2Fimg%2Fdefault.jpg&f=1&nofb=1"
                class="result-image"
                alt=""
              />
              <div class="text-price-container">
                <div>
                  <div>{{ result.name }}</div>
                  <div class="result-category">
                    {{ result.category }}
                    <small class="in-stock"> på lager</small>
                  </div>
                </div>
                <div class="price">359,-</div>
              </div>
            </div>
          </li>
          <hr />
        </ul>
        <div class="all-search-results">
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

    // splitCategories og countReducedCategories vil ikke bli brukt videre
    splitCategories(array) {
      if (array.length) {
        let categoriesArray = [];
        array.forEach((array) => {
          const splittedCat = array.category.split(", ");
          splittedCat.forEach((category) => {
            categoriesArray.push(category);
          });
        });
        this.countReducedCategories(categoriesArray);
      }
    },
    countReducedCategories(array) {
      if (array.length) {
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
* {
  text-align: left;
  box-sizing: border-box;
}
ul {
  all: unset;
}
li {
  list-style-type: none;
}
h4 {
  padding: 0 5px;
}
.search-field {
  position: absolute;
  min-width: 30px;
}
.search-input {
  position: relative;
  z-index: 10;
}

.result-image {
  width: 40px;
  height: 40px;
  margin-right: 8px;
}
.text-price-container {
  display: flex;
  justify-content: space-between;
  /* width: 100%; */
  padding: 2px;
}
/* .text-price-container > div  {
  position: relative;
} */

.result-category {
  /* text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%; */
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
  /* border-radius: 0 0 5px 5px; */
  max-height: 60vh;
}

.result-item {
  display: flex;
  justify-content: left;
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
.all-search-results {
  font-size: 0.9rem;
  padding: 15px 5px;
  cursor: pointer;
}
.all-search-results:hover {
  background-color: rgb(235, 235, 235);
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

/* EFFEKTOVERGANGER */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.result-enter-active,
.result-leave-active {
  transition: transform 0.3s ease;
  transition: max-height 0.5s ease;
}
.result-enter-from {
  transform: translateY(-100%);
  opacity: 0;
  max-height: 30vh;
}
.result-leave-to {
  transform: translateY(-100%);
  opacity: 0;
  max-height: 60vh;
}
@media only screen and (max-width: 600px) {
}
</style>        