<template>

    <div class="card-bag-wrapper">
        <div class="card-bag-image">
            <img :src="obj.imageUrl[0]" alt="">
        </div>
        <div class="card-bag-info">
            <div class="card-bag-price">
                <span v-if="obj.price && !obj.newPrice">${{obj.price}}</span>
                <span v-if="obj.newPrice">
                    <span class="product-price-new">${{obj.newPrice}}</span>
                    <span><s class="card-bag-old-price">${{obj.price}}</s></span>
                </span>
            </div>
            <div class="card-bag-title">{{obj.title}}</div>
            <div class="card-bag-variants" v-if="!checkout">
                <span class="card-bag-color">{{obj.colors[0] || obj.colors}}</span>
                <div class="card-bag-multi">
                    <multiselect v-model="selectedSize" :options="obj.sizes" :placeholder="selectedSize" :select-label="''" deselect-label="" selected-label="" :allow-empty="false"></multiselect>
                </div>
                <div class="card-bag-multi">
                    <multiselect v-model="quantity" :options="quantityList" :custom-label="nameWithLang" placeholder="Qty" :select-label="''" deselect-label="" selected-label="" :allow-empty="false"></multiselect>
                </div>
            </div>
            <div class="card-checkout-variants" v-else>
                <span class="card-bag-color">{{obj.colors[0] || obj.colors}}</span>
                <span>Size: {{obj.selected}}</span>
                <span>Qty: {{obj.quantityOfSelected}}</span>
            </div>
        </div>
        <div class="card-bag-delete" @click="deleteItem" v-if="!checkout">
            <font-awesome-icon class="fa" icon="times" />
        </div>
    </div>

</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name: 'CardInBag',
    data() {
        return {
            selectedSize: null,
            quantity: null
        }
    },
    props: {
        obj: {
            type: Object,
            default: () => {}
        },
        checkout: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapMutations({
            editCartItem: 'cart/editCartItem',
            deleteProduct: 'cart/deleteProduct'
        }),
        deleteItem() {
            this.deleteProduct(this.obj)
        },
        nameWithLang (str) {
            return `Qty ${str}`
        }
    },
    computed: {
        quantityList() {
            let list = []
            for (let i = 1; i <= 10; i++) {
                list.push(String(i))
            }
            return list
        }
    },
    mounted() {
        this.selectedSize = this.obj.selected,
        this.selectedQuantity = this.obj.quantityOfSelected

    },
    watch: {
        selectedSize() {
            this.editCartItem({...this.obj, selected: this.selectedSize})
        },
        quantity() {
            this.editCartItem({...this.obj, quantityOfSelected: this.quantity})
        }
    }
}
</script>
