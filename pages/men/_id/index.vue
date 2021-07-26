<template>
    <div class="products-wrap">
        <Loader v-if="loader" />
        <div class="products-main" v-else>
            <BreadCrumbs />
            <SortProduct :obj=" sortedProducts || subcategory.products" @sorted="sortSubcategory" />
            <div class="products-main-block" v-if="this.sortedProducts && this.sortedProducts.length > 0">
                <ul class="products-main-block-list" >
                    <li class="products-main-block-item" v-for="(item, id) in this.sortedProducts" :key="id">
                        <ProductCard :product="item" @obj="goToCard"/>
                    </li>
                </ul>
            </div>
            <NotFoundProducts v-else/>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            loader: true,
            sortedProducts: []
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
        goToCard(obj) {
            this.$router.push(`${this.$route.fullPath}/${obj.slug}`)
        },
        sortSubcategory(dataFilter) {
            let mainArr = JSON.parse(JSON.stringify(this.subcategory.products))

            function sortProducts() {
                let arr = JSON.parse(JSON.stringify(mainArr))
                let {brand, color, priceRange, size, type, selected} = dataFilter

                if (selected) {
                    let newArr = JSON.parse(JSON.stringify(arr))
                    if (selected == 'Price low to high') {
                        arr = newArr.sort((a, b) => (a.newPrice || a.price) > (b.newPrice || b.price) ? 1 : -1)

                    } else if (selected == 'Price high to low') {
                        arr = newArr.sort((a, b) => (a.newPrice || a.price) < (b.newPrice || b.price) ? 1 : -1)  
                    } 
                }
                if (brand) {
                    
                    let sortedProducts = []
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].brand == brand) {
                            sortedProducts.push(arr[i])
                        }
                    }
                    arr = [...sortedProducts]
                }
                if (type) {
                    let sortedProducts = []
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].productType == type) {
                            sortedProducts.push(arr[i])
                        }
                    }
                    arr = [...sortedProducts]
                }
                if (color) {
                    let sortedProducts = []
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].colors == color) {
                            
                            sortedProducts.push(arr[i])
                        }
                    }
                    arr = [...sortedProducts]
                }
                if (size) {
                    let sortedProducts = []
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].sizes.forEach(item => {
                            if (item == size) {
                                sortedProducts.push(arr[i])
                            }
                        })
                    }
                    arr = [...sortedProducts]
                }
                if (priceRange) {
                    let sortedProducts = []
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].price <= +priceRange) {
                            sortedProducts.push(arr[i])
                        }
                    }
                    arr = [...sortedProducts]
                }
                
                return arr
            }
            let sortedArray = sortProducts()
     
            return this.sortedProducts = sortedArray
        }
    },
    computed: {
        isSubcategry: ({$route: {params: {id}}}) => id !== undefined,
        ...mapGetters({
            subcategory: 'subcategory/subcategory'
        })
    },
    async mounted() {
        if (this.isSubcategry) {
            await this.fetchSubcategory(this.$route.params.id)
            this.loader = false
            return
        }
    }
}
</script>
