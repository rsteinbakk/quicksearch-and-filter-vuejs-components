Vue.component("selectfilter", {
    // Ikke lage checkbox, men dropdown
    // Når man velger noe , så kjører den store getter
    template:
        '<div class="filter" v-if="filter">\
            <p>{{filter.label}}:</p>\
            <label v-for="value in filter.availableValues">\
                <input type="checkbox" v-model="values" :value="value.value"> {{value.label}} <span class="count">({{value.count}})</span>\
            </label>\
        </div>',
    props: {
        filter: Object
    },
    data: function () {
        return {
        };
    },

    computed: {
        values: {
            get: function () {
                return this.$store.getters["filters/values"](this.filter.name) || [];
            },
            set: function (value) {
                this.$store.dispatch('filters/set', { name: this.filter.name, values: value });
            }
        }
    }
});