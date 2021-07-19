<template>
    <div class="product-card" @click="getObj">
        <div class="product-card-image">
            <img :src="product.imageUrl[0]" alt="">
        </div>
        <div class="product-card-title font-weight-bold">{{product.title}}</div>
        <div class="product-card-price font-weight-bold">$ {{product.price}}</div>
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
    }
  }
</script>

