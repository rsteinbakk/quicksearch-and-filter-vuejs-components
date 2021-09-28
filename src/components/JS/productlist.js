// KOPIERT TIL PRODUCTLIST.VUE

Vue.component("productlist", {
    template:
        '<div>\
            <div class="col-md-6 col-lg-4 productboxes" v-for="product in products" :key="product.id">\
                <article class="list-product">\
                    <figure v-if="product.thumb">\
                        <a :href="product.url"><img class="img-responsive lazyload" :data-src="product.thumb" /></a>\
                    </figure>\
                    <p class="ratings" v-if="product.rating" v-html="product.rating"></p>\
                    <p class="item-name"><a :href="product.url">{{product.name}}</a></p>\
                    <div class="brand">{{product.brand}}</div>\
                    <div class="sku">{{product.sku}}</div>\
                    <p class="list-price" v-if="product.listPrice">Før: {{product.listPrice}}</p>\
                    <p class="item-price">{{product.price}}</p>\
                    <p class="view-details"><a :href="product.url" class="button">Se produkt</a></p>\
                    <div class="product-banners">\
                        <p v-if="product.Message">{{product.message}}</p>\
                        <p v-if="product.CampaignText">{{product.campaignText}}</p>\
                    </div>\
                    <div class="clearfix"></div>\
                </article>\
            </div>\
        </div>',
    props: {
        category: String
    },
    data() {
        return {
            products: [],
            queryString: null
        };
    },
    methods: {
        reloadProducts: function () {
            var model = this;
            var url = "/nettbetaling/products/list?category=" + model.category;
            var query = model.queryString = this.$store.getters["filters/queryString"].replace("?", "");
            fetch(url + "&" + query, { cache: 'no-cache' })
                .then(function (response) {
                    if (response.ok) {
                        response.json().then(function (result) {
                            if (model.queryString === query) {
                                model.products = result.products;
                                model.$nextTick(function () { if (window.lazyLoader) window.lazyLoader.update(); });
                            }
                        });
                    }
                });
        }
    },
    created: function () {
        this.products = initProductlist.products;
        this.queryString = this.$store.getters["filters/queryString"];
        this.$nextTick(function () { if (window.lazyLoader) window.lazyLoader.update(); });

        var model = this;
        this.$store.subscribe(function (mutation, state) {
            if (mutation.type === "filters/set") {
                model.reloadProducts();
            }
        })
    }
});