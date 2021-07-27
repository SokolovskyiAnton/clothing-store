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
                                    @sliding-start="onSlideStart"
                                    @sliding-end="onSlideEnd"
                                >
                                    <b-carousel-slide  v-for="(image, id) in product.imageUrl" :key="id" :img-src="image"></b-carousel-slide>
                                </b-carousel>
                            </div>
                        </div>
                        <div class="product-block-aside">
                            <h3 class="product-block-aside-title">{{product.title}}</h3>
                            <div class="product-block-aside-price">${{product.price}}</div>
                            <div><span class="product-block-aside-delivery">Free Delivery</span></div>
                            <div class="product-block-aside-color"><span class="aside-color-key">Color:</span> <span class="aside-color-value">{{product.colors[0]}}</span></div>
                            <div class="product-block-aside-size">
                                <div class="aside-size">Size:</div>
                                <multiselect class="aside-select" v-model="selected" :options="product.sizes" placeholder="Size" :select-label="''"></multiselect>
                                <div v-if="isSelectError" class="invalid-select">Please select from the available size options</div>
                            </div>
                            <div class="product-block-aside-button">
                                <button class="aside-button" @click="addToBag">Add to bag</button>
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
        onSlideStart() {
            this.carousel.sliding = true
        },
        onSlideEnd() {
            this.carousel.sliding = false
        },
        addToBag() {
            if (this.selected == "" || this.selected == null) {
                return this.selectError = true
            }
            console.log('1');
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
