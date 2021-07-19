<template>
    <div class="products-wrap">
        <Loader v-if="loader" />
        <div class="products-main" v-else>
            <BreadCrumbs />
            <SortProduct :obj="subcategory" @sorted="sortedSubcategory"/>
            <div class="products-main-block" v-if="this.sortedProductsOfSubcategory.length > 0">
                <ul class="products-main-block-list" >
                    <li class="products-main-block-item" v-for="(item, id) in this.sortedProductsOfSubcategory" :key="id">
                        <ProductCard :product="item" @obj="getCard"/>
                    </li>
                </ul>
            </div>
            <NotFoundProducts v-else/>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            loader: true,
            sortedProductsOfSubcategory: 0
        }
    },
    name: 'ProductsMen',
    components: {
        NotFoundProducts: () => import('@/components/common-components/NotFoundProducts.vue'),
        BreadCrumbs: () => import('@/components/common-components/BreadCrumbs.vue'),
        ProductCard: () => import('@/components/products/ProductCard'),
        SortProduct: () => import('@/components/products/SortProduct.vue')
    },
    methods: {
        ...mapActions({
            fetchSubcategory: 'subcategory/fetchSubcategory'
        }),
        getCard(obj) {
            this.$router.push(`${this.$route.fullPath}/${obj.slug}`)
        },
        sortedSubcategory(obj) {
            this.sortedProductsOfSubcategory = obj.products
        }
    },
    computed: {
        isSubcategry: ({$route: {params: {id}}}) => id !== undefined,
        ...mapGetters({
            subcategory: 'subcategory/subcategory'
        })
    },
    mounted() {
        if (this.isSubcategry) {
            this.fetchSubcategory(this.$route.params.id)
            this.loader = false
            return
        }
    }
}
</script>
