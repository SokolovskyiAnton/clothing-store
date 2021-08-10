<template>
    <div class="product">
        <Loader v-if="loader"/>
        <div class="product-wrap" v-else>
            <BreadCrumbs /> 
            
            <div class="product-block"> 
                <div class="product-block-container">
                    <div class="product-block-main">
                        <div class="product-block-gallery">
                            <div class="carousel-block">
                                <b-carousel
                                    id="carousel-1"
                                    v-model="carousel.slide"
                                    :interval="10000"
                                    fade
                                    controls
                                >
                                    <b-carousel-slide  v-for="(image, id) in product.imageUrl" :key="id" :img-src="image"></b-carousel-slide>
                                </b-carousel>
                            </div>
                        </div>
                        <div class="product-block-aside">
                            <div class="product-block-wrap-header">
                                <h3 class="product-block-aside-title">{{product.title}}</h3>
                                <div class="product-block-aside-price">
                                    <span v-if="product.price && !product.newPrice">${{product.price}}</span>
                                    <span v-if="product.newPrice">
                                        <span class="old-price">Was <s>${{product.price}}</s></span>
                                        <span class="new-price">Now ${{product.newPrice}}<span class="percent-price">({{calculatingParcent}}%)</span></span>
                                    </span>
                                </div>
                                <div>
                                    <span class="product-block-aside-delivery">Free Delivery</span>
                                </div>
                            </div>
                            <div class="product-block-wrap-footer">
                                <div class="product-block-aside-color">
                                    <span class="aside-color-key">Color:</span> 
                                    <span class="aside-color-value">{{product.colors[0]}}</span>
                                </div>
                                <div class="product-block-aside-size">
                                    <div class="aside-size">Size:</div>
                                    <multiselect class="aside-select" v-model="selected" :options="product.sizes" placeholder="Size" :select-label="''"></multiselect>
                                    <div v-if="isSelectError" class="invalid-select">Please select from the available size options</div>
                                </div>
                                <div class="product-block-aside-button">
                                    <button class="aside-button" @click="addToBag" :class="{productAdded: productAdded}">
                                        <font-awesome-icon v-if="productAdded" class="fa" icon="check" />
                                        {{productAdded ? 'Added' : 'Add to bag'}}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-block-info">
                        <h2 class="product-block-info-title">
                            Product details
                        </h2>
                        <p class="product-block-info-description">{{product.description}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from 'vuex'
  export default {
    data() {
        return {
            loader: true,
            selected: '',
            selectError: false,
            productAdded: false,
            carousel: {
                slide: 0,
                sliding: null
            }
        }
    },
    components: {
        BreadCrumbs: () => import('@/components/common-components/BreadCrumbs.vue')
    },
    methods: {
        ...mapActions({
            fetchProduct: 'product/fetchProduct'
        }),
        ...mapMutations({
            addToCart: 'cart/addToCart'
        }),
        addToBag() {
            let key = new Date().getTime();
            if (this.selected == "" || this.selected == null) {
                return this.selectError = true
            }
            this.productAdded = true
            const obj = {...this.product, selected: this.selected, quantityOfSelected: 1, uniqueKey: key
            }
            this.addToCart(obj)
            this.$bvToast.toast("It's in the bag",{
                title: 'Success!',
                toaster: 'b-toaster-top-right',
                autoHideDelay: 2000,
                variant: 'success',
                solid: true
            })
            setTimeout(() => {
                this.productAdded = false
                this.selected = ""
            }, 2500)
        }
    },
    computed: {
        isProduct: ({$route: {params: {id}}}) => id !== undefined,
        ...mapGetters({
            product: 'product/product'
        }),
        isSelectError() {
            if (this.selected) {
                return this.selectError = false
            } else {
                return this.selectError
            }
            
        },
        calculatingParcent() {
            return ((this.product.price - this.product.newPrice) / this.product.price * 100).toFixed(1)
        }
    },
    async mounted() {
        if (this.isProduct) {
            await this.fetchProduct(this.$route.params.product)
            this.loader = false
            return
        }
    }
  }
</script>
