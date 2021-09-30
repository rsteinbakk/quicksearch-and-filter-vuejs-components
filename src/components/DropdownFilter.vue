<template>
  <!-- Først hente filter.js -->
  <!-- Hente hhttps://www.seljordvarme.no/nettbetaling/products/filters?category=625, lage dropdown per field (loop over)-->
  <!-- 
    // Ikke lage checkbox, men dropdown
    // Når man velger noe , så kjører den store getter -->
  <div class="filter" v-if="filter">
    <!-- <select @change="switchFilterValue($event)" class="dropdownfilter">
      <option value="" selected>{{ filter.label }}</option>
      <option
        v-for="(value, index) in filter.availableValues"
        :key="index"
        :value="value.value"
      >
        {{ value.label }} ({{ value.count }})
      </option>
    </select> -->

    <div v-if="filter">
      <DropdownMenu :label="label" :allowProp="true">
        <ul>
          <li @click="switchFilterValue()">Alle</li>
          <li
            v-for="(value, index) in filter.availableValues"
            :key="index"
            @click="switchFilterValue(value)"
          >
            {{ value.label }} <span class="count">({{ value.count }})</span>
          </li>
        </ul>
      </DropdownMenu>
    </div>

    <!-- {{ filter }}  -->

    <!-- GAMMEL VERSJON: CHECKBOX START 
    <label v-for="(value, index) in filter.availableValues" :key="index">
      <input type="checkbox" v-model="values" :value="value.value" />
      {{ value.label }} <span class="count">({{ value.count }})</span>
      {{ values }}
      </label> 
     GAMMEL VERSJON: CHECKBOX SLUTT -->
  </div>

  <!-- MIDLERTIDIG  -->
  <small style="color: lightgrey">{{ values }}</small>
  <!-- MIDLERTIDIG  -->
</template>

<script>
import DropdownMenu from "./DropdownMenu.vue";
export default {
  props: {
    filter: Object,
  },
  components: { DropdownMenu },
  data() {
    return {
      selectedValue: null,
    };
  },
  methods: {
    switchFilterValue(value) {
      this.selectedValue = value;
      if (!value) {
        this.values = [];
      } else {
        this.values = [value.value];
      }
    },
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
    label() {
      if (this.selectedValue) {
        return this.filter.label + ": " + this.selectedValue.label;
      } else {
        return this.filter.label;
      }
    },
  },
  // Fetch: ttps://www.seljordvarme.no/nettbetaling/products/filters?category=625
  // eksisterer ikke søk per nå, lages senere
  // Hvert field har availble values, det er verdiene som dropdownen skal ha -->
};
</script>
