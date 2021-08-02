<template>
    <div class="product-card" @click="getObj">
        <div class="product-card-image">
            <img :src="product.imageUrl[0]" alt="">
        </div>
        <div class="product-card-title font-weight-bold">{{product.title}}</div>
        <div class="product-card-price font-weight-bold">
            <span v-if="product.price && !product.newPrice">${{product.price}}</span>
            <span v-if="product.newPrice">
                <span><s>${{product.price}}</s></span>
                <span class="product-price-new">${{product.newPrice}}</span>
            </span>
        </div>
        <div class="product-discount" v-if="product.newPrice">-{{calculatingParcent}}%</div>
    </div>
</template>

<script>
  export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        getObj() {
            this.$emit('obj', this.product)
        }
    },
    computed: {
        calculatingParcent() {
            return ((this.product.price - this.product.newPrice) / this.product.price * 100).toFixed(1)
        }
    }
  }
</script>

