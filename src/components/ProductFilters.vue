<template>
  <!-- Denne ligger ytterst. Den har barnene : den har flere dropdownfilter -->
  <div>
    <DropdownFilter
      v-for="filter in filters"
      :key="filter.name"
      :filter="filter"
    >
    </DropdownFilter>

    <!-- {{filters}} -->
  </div>
</template>

<script>
import DropdownFilter from "./DropdownFilter.vue";
export default {
  components: { DropdownFilter },
  data() {
    return {};
  },
  computed: {
    filters() {
      return this.$store.getters["filters/filters"];
    },
  },
  created() {
    // På sikt et mål å flytte initCategoryFilter.fields til en mer global plass.
    // Her fetches filteret første gangen, så setter den init mot store. Lager variabler , sjekker i url om filteret allerede er satt.

    this.$store.dispatch("filters/init");
  },
};
</script>

<style lang="scss" scoped>
  
</style>