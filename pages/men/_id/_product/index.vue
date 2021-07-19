<template>
    <div class="product">
        <Loader v-if="loader"/>
        <div class="product-info" v-else>
            <BreadCrumbs />
            {{product}}
        </div>
    </div>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from 'vuex'
  export default {
    data() {
        return {
            loader: true
        }
    },
    components: {
        BreadCrumbs: () => import('@/components/common-components/BreadCrumbs.vue')
    },
    methods: {
        ...mapActions({
            fetchProduct: 'product/fetchProduct'
        })
    },
    computed: {
        isProduct: ({$route: {params: {id}}}) => id !== undefined,
        ...mapGetters({
            product: 'product/product'
        })
    },
    mounted() {
        if (this.isProduct) {
            this.fetchProduct(this.$route.params.product)
            this.loader = false
            return
        }
    }
  }
</script>
