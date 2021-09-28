<template>
  <div>
    <!-- uavehengig av de andre filtrene, -->
    <!-- denne lytter på hva som skjer i store, og oppdaterer lista -->
    <div>
      <div
        class="col-md-6 col-lg-4 productboxes"
        v-for="product in products"
        :key="product.id"
      >
        <article class="list-product">
          <figure v-if="product.thumb">
            <a :href="product.url"
              ><img class="img-responsive lazyload" :src="product.thumb"
            /></a>
          </figure>
          <p class="ratings" v-if="product.rating" v-html="product.rating"></p>
          <p class="item-name">
            <a :href="product.url">{{ product.name }}</a>
          </p>
          <div class="brand">{{ product.brand }}</div>
          <div class="sku">{{ product.sku }}</div>
          <p class="list-price" v-if="product.listPrice">
            Før: {{ product.listPrice }}
          </p>
          <p class="item-price">{{ product.price }}</p>
          <p class="view-details">
            <a :href="product.url" class="button">Se produkt</a>
          </p>
          <div class="product-banners">
            <p v-if="product.Message">{{ product.message }}</p>
            <p v-if="product.CampaignText">{{ product.campaignText }}</p>
          </div>
          <div class="clearfix"></div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import products from "../api/products.js";
// Burde man kanskje importere getProducts her?
export default {
  data() {
    return {
      products: [],
      queryString: null,
    };
  },
  methods: {
    reloadProducts() {
      // LEGG OVER PÅ API
      let model = this;
      let query = (model.queryString = this.$store.getters[
        "filters/queryString"
      ].replace("?", ""));
      products
        .getProducts("&" + query, { cache: "no-cache" })
        .then(function (result) {
          if (model.queryString === query) {
            model.products = result.products;
            model.$nextTick(function () {
              if (window.lazyLoader) window.lazyLoader.update();
            });
          }
        });
    },
  },
  created() {
    // this.products = initProductlist.products;
    // HER MÅ DET LAGES EN GETTER I FILTERS.JS
    this.reloadProducts();
    
    let model = this;
    this.$store.subscribe(function (mutation, state) {
      if (mutation.type === "filters/set") {
        model.reloadProducts();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
</style>