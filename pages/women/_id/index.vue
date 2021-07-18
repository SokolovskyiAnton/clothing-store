<template>
    <div class="products-wrap">
        <Loader v-if="loading"/>
        <div class="products-main" v-else>
            <BreadCrumbs />
            <div class="products-main-block" v-if="subcategory.products && subcategory.products.length > 0">
                <ul class="products-main-block-list" >
                    <li class="products-main-block-item" v-for="(item, id) in subcategory.products" :key="id">
                        <ProductCard :product="item"/>
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
            loading: true
        }
    },
    name: 'ProductsMen',
    components: {
        NotFoundProducts: () => import('@/components/NotFoundProducts.vue'),
        ProductCard: () => import('@/components/ProductCard'),
        BreadCrumbs: () => import('@/components/BreadCrumbs.vue')
    },
    methods: {
        ...mapActions({
            fetchSubcategory: 'subcategory/fetchSubcategory'
        })
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
            this.loading = false
            return
        }
    }
}
</script>
