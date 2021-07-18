<template>
    <div class="product-info">
        <Loader v-if="loading"/>
        <BreadCrumbs />
        {{product}}
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
    components: {
        BreadCrumbs: () => import('@/components/BreadCrumbs.vue')
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
            this.loading = false
            return
        }
    }
  }
</script>
