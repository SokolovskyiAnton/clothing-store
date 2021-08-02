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
            <div class="card-bag-variants">
                <span class="card-bag-color">{{obj.colors[0] || obj.colors}}</span>
                <div class="card-bag-multi">
                    <multiselect v-model="selected" :options="obj.sizes" :placeholder="selected" :select-label="''" deselect-label="" selected-label=""></multiselect>
                </div>
                <div class="card-bag-multi">
                    <multiselect v-model="quantity" :options="quantityList" placeholder="Qty" :select-label="''" deselect-label="" selected-label=""></multiselect>
                </div>
            </div>
        </div>
        <div class="card-bag-delete" @click="deleteItem">
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
            selected: null,
            quantity: null
        }
    },
    props: {
        obj: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        ...mapMutations({
            editCartItem: 'cart/editCartItem',
            deleteProduct: 'cart/deleteProduct'
        }),
        deleteItem() {
            this.deleteProduct(this.obj)
        }
    },
    computed: {
        quantityList() {
            let list = []
            for (let i = 1; i <= 10; i++) {
                list.push(i)
            }
            return list
        }
    },
    mounted() {
        this.selected = this.obj.selected
    },
    watch: {
        selected() {
            this.editCartItem({...this.obj, selected: this.selected})
        },
        quantity() {
            this.editCartItem({...this.obj, quantityOfSelected: this.quantity})
        }
    }
}
</script>
