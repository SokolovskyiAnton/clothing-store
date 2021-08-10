<template>
<!-- страница доставки и возврата,  фикс блок тотал -->
    <div>
        <NotFoundProducts v-if="this.cartItems.length == 0"/>
        <div class="cart" v-else>
            <div class="cart-message-holder" v-if="this.cartSubTotalPrice < 35">
                <span>Can we tempt you? Spend another ${{(35-this.cartSubTotalPrice).toFixed(2)}} to qualify for FREE Delivery</span>
            </div>
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
                            <span class="mr-3">SUB-TOTAL</span> ${{cartSubTotalPrice}}
                        </div>
                    </div>
                    <div class="cart-total-wrapper">
                        <div class="cart-total-header">TOTAL</div>
                        <div class="cart-total-subtotal">
                            <span class="subtotal-name">Sub-total </span>
                            <span class="subtotal-price">${{cartSubTotalPrice}}</span>
                        </div>
                        <div class="cart-total-delivery">
                            <div class="delivery-info">Delivery</div>
                            <multiselect v-model="delivery" :options="deliveryList" :placeholder="delivery" :select-label="''" deselect-label="" selected-label=""></multiselect>
                        </div>
                        <div class="cart-total-checkout">
                            <button @click="toCheckout" class="cart-btn-submit">checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    name: 'Cart',
    data() {
        return {
            delivery: null
        }
    },
    components: {
        CardInBag: () => import('@/components/products/CardInBag.vue'),
        NotFoundProducts: () => import('@/components/common-components/NotFoundProducts.vue'),
    },
    methods: {
        ...mapMutations({
            setDelivery: 'cart/setDelivery'
        }),
        toCheckout() {
            this.setDelivery(this.delivery)
            this.$router.push('/checkout')
        }
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/cartItems',
            cartSubTotalPrice: 'cart/cartSubTotalPrice'
        }),
        deliveryList() {
            if (this.cartSubTotalPrice < 35) {
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
        },
        
    },
    mounted() {
        this.delivery = this.deliveryList[0]
    }
}
</script>

