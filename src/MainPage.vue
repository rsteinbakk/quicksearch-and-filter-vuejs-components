<template>
  <div class="contianer" v-show="true">
    <h1>QuickSearch</h1>
    <section>
      <QuickSearch class="quicksearch"></QuickSearch>
    </section>
    <div class="filters">
      <ProductFilters></ProductFilters>
      <ProductList></ProductList>
    </div>
  </div>
</template>

<script>
import QuickSearch from "./components/QuickSearch.vue";
import ProductFilters from "./components/ProductFilters.vue";
import ProductList from "./components/ProductList.vue";
export default {
  components: { QuickSearch, ProductFilters, ProductList },
  data() {
    return {};
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: #075db3;
  transition: all 0.3s;
}
a:hover {
  text-decoration: underline;
}
.dropdownfilter {
  width: 170px;
}
.img-responsive {
  max-width: 200px;
}
.filters {
  display: grid;
  grid-template-columns: 3fr 9fr;
}
.productscontainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.in-stock {
  color: rgb(197, 197, 197);
}

.filters {
  padding: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quicksearch {
  width: 500px;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70px;
  margin: 10px;
  background-color: rgb(219, 219, 219);
  padding: 15px;
  border-radius: 5px;
}

@media only screen and (max-width: 600px) {
  .quicksearch {
    width: 300px;
  }
  .filters {
    grid-template-columns: 1fr;
  }
}
</style>