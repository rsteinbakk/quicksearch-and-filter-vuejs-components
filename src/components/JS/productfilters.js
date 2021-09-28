Vue.component("productfilters", {
    template:
        '<div>\
            <dropdownfilter v-for="filter in filters" :key="filter.name" :filter="filter">\
            </dropdownfilter>\
        </div>',
    props: {
    },
    data: function () {
        return {
            filters: []
        };
    },
    methods: {
    },
    created: function () {
        const filters = initCategoryFilter.fields;
        // Her fetches filteret første gangen, så setter den init mot store. Lager variabler , sjekker i url om filteret allerede er satt.
        this.$store.dispatch("filters/init", filters);
        this.filters = filters;
    }
});