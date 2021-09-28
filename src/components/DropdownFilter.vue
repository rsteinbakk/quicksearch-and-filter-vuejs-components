<template>
  <!-- Først hente filter.js -->
  <!-- Hente hhttps://www.seljordvarme.no/nettbetaling/products/filters?category=625, lage dropdown per field (loop over)-->
  <!-- 
    // Ikke lage checkbox, men dropdown
    // Når man velger noe , så kjører den store getter -->
  <div class="filter" v-if="filter">
    <select @change="switchFilterValue($event)" class="dropdownfilter">
      <option value="" selected>{{ filter.name }}</option>
      <option
        v-for="(value, index) in filter.availableValues"
        :key="index"
        :value="value.value"
      >
        {{ value.label }} ({{ value.count }})
      </option>
    </select>

    <!-- {{ filter }}  -->

   <!-- <label v-for="(value, index) in filter.availableValues" :key="index">
      <input type="checkbox" v-model="values" :value="value.value" />
      {{ value.label }} <span class="count">({{ value.count }})</span>

    {{ values }}
    </label> -->
  </div>
    <small style="color: lightgrey;">{{ values }}</small>
</template>

<script>
export default {
  props: {
    filter: Object,
  },
  data() {
    return {
      // key: "value",
    };
  },
  methods: {
    switchFilterValue(event) {
      this.values = event.target.value;
    }
  },
  computed: {
    values: {
      get: function () {
        return this.$store.getters["filters/values"](this.filter.name) || [];
      },
      set: function (value) {
        this.$store.dispatch("filters/set", {
          name: this.filter.name,
          values: value,
        });
      },
    },
  },
  // Fetch: ttps://www.seljordvarme.no/nettbetaling/products/filters?category=625
  // eksisterer ikke søk per nå, lages senere
  // Hvert field har availble values, det er verdiene som dropdownen skal ha -->
};
</script>

<style>
</style>        