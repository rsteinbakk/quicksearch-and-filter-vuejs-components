const dropdownmenu = Vue.component("dropdownmenu", {
    template:
        '<div class="dropdown-menu" v-on:click.prevent="openMenu" :class="{\'open\': open}">\
            <slot name="link">{{label}}</slot>\
            <div v-on:click="propagate">\
                <slot></slot>\
            </div>\
        </div>',
    props: ["label", "allowProp"],
    data: function () {
        return {
            open: false
        };
    },
    methods: {
        openMenu: function () {
            var model = this;
            if (!model.open)
                setTimeout(function () { model.open = true; }, 1);
        },
        propagate: function (e) {
            if (!this.allowProp)
                e.stopPropagation();
        }
    },
    created: function () {
        var model = this;

        document.body.addEventListener("click", function () {
            model.open = false;
            return true;
        });
    }
});