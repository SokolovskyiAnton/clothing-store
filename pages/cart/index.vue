<template>
<!-- страница доставки и возврата, карточка сабкатегории цвет, корзина нижний отсутп, фикс блок тотал, cartItems = 0 скрыть корзину -->
    <div class="cart">
        <div class="cart-container">
            <div class="cart-wrapper">
                <div class="cart-content-wrapper">
                    <div class="cart-content-header">
                        MY BAG
                    </div>
                    <div class="cart-content-list">
                        <ul class="cart-group">
                            <li class="cart-group-item" v-for="(item, id) in cartItems" :key="id">
                                <CardInBag :obj="item"/>
                            </li>
                        </ul>
                    </div>
                    <div class="cart-content-subtotal">
                        <span class="mr-3">SUB-TOTAL</span> ${{cartTotalPrice}}
                    </div>
                </div>
                <div class="cart-total-wrapper">
                    <div class="cart-total-header">TOTAL</div>
                    <div class="cart-total-subtotal">
                        <span class="subtotal-name">Sub-total </span>
                        <span class="subtotal-price">${{cartTotalPrice}}</span>
                    </div>
                    <div class="cart-total-delivery">
                        <div class="delivery-info">Delivery</div>
                        <multiselect v-model="delivery" :options="deliveryList" :placeholder="delivery" :select-label="''" deselect-label="" selected-label=""></multiselect>
                    </div>
                    <div class="cart-total-checkout">
                        <button @click="goToCheckout" class="cart-btn-submit">checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'Cart',
    data() {
        return {
            delivery: null
        }
    },
    components: {
        CardInBag: () => import('@/components/products/CardInBag.vue')
    },
    methods: {
        goToCheckout() {
            this.$router.push('/checkout')
        }
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/cartItems',
            cartTotalPrice: 'cart/cartTotalPrice'
        }),
        deliveryList() {
            if (this.cartTotalPrice <= 35) {
                return [
                    'Standart delivery ($6.50)',
                    'Express delivery ($20.00)'
                ]
            } else {
                return [
                    'Free delivery',
                    'Express delivery ($20.00)'
                ]
            }
        }
    },
    mounted() {
        this.delivery = this.deliveryList[0]
    }
}
</script>

