<template>
    <!-- name, lastname, phone, email, address, city, delivery, price, products -->
    <div class="checkout">
        <h2 class="text-center font-weight-bold">CHECKOUT</h2>
        <div class="checkout-container">
            <div class="checkout-wrapper">
                <div class="checkout-payment">
                    <div class="address-info">
                        <div class="address-info-title">Delivery Address</div>
                        <form @submit.prevent="onSubmnit" class="address-info-form">
                            <label for="firstName">First name:</label>
                            <input v-model="name" type="text" id="firstName">

                            <label for="lastName">Last Name:</label>
                            <input v-model="lastname" type="text" id="lastName">

                            <label for="phone">Mobile:</label>
                            <input v-model="phone" type="number" id="phone">

                            <label for="email">email:</label>
                            <input v-model="email" type="email" id="email">

                            <label for="city">city:</label>
                            <input v-model="city" type="text" id="city">
                            
                            <label for="address">address:</label>
                            <input v-model="address" type="text" id="address">

                            <button type="submit">Deliver to this Address</button>
                        </form>
                    </div>
                    <div class="card-payment">
                        <div class="mask-overlay" v-if="payment_intent == null"></div>
                        <div class="card-payment-wrapper">
                            <h2>payment</h2>
                            <div ref="card" class="card"></div>
                            <button @click="pay">place order</button>
                        </div>
                    </div>
                </div>
                <div class="checkout-total">
                    <div class="quantity-items">
                        <span>{{cartItems.length}}</span>
                        <span>{{cartItems.length > 1 ? 'Items' : 'Item'}}</span>
                    </div>
                    <div class="products-block">
                        <ul class="products-block-list">
                            <li v-for="(item, id) in cartItems" :key="id">
                                <CardInBag :obj="item" :checkout="true"/>
                            </li>
                        </ul>
                    </div>
                    <div class="price-block">
                        <div class="price-block-subtotal">
                            <span>Subtotal:</span>
                            <span>${{cartSubTotalPrice}}</span>
                        </div>
                        <div class="price-block-delivery">
                            <span>Delivery:</span>
                            <span>${{delivery.price}}</span>
                        </div>
                        <div class="price-block-total">
                            <span>Total to pay:</span>
                            <span>${{totalPrice}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Checkout',
    layout: 'checkout',
    components: {
        CardInBag: () => import('@/components/products/CardInBag.vue')
    },
    data() {
        return {
            card: '',
            payment_intent: null,
            name: null,
            lastname: null,
            phone: null,
            email: null,
            city: null,
            address: null
        }
    },
    methods: {
        ...mapActions({
            hundleBuy: 'cart/hundleBuy'
        }),
        async pay() {
            try {
                const payment = await this.$stripe.confirmCardPayment(this.payment_intent, {
                    payment_method: {
                        card: this.card
                    }
                })
                this.card.clear()
            } catch (error) {
                console.log(error);
            }
        },
        async onSubmnit() {
            const obj = {
                name: this.name,
                lastname: this.lastname,
                phone: this.phone,
                email: this.email,
                city: this.city,
                address: this.address,
                delivery: this.delivery,
                price: +this.totalPrice,
                products: this.cartItems
            }
            const intent = await this.hundleBuy({...obj})
            this.payment_intent = intent.data.paymentIntent.client_secret
        }
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/cartItems',
            cartSubTotalPrice: 'cart/cartSubTotalPrice',
            delivery: 'cart/delivery'
        }),
        totalPrice() {
            return +this.cartSubTotalPrice + +this.delivery.price
        }
    },
    mounted() {
        if (this.$stripe) {
            const elements = this.$stripe.elements();
            this.card = elements.create('card', {});
            this.card.mount(this.$refs.card);
        }
    }
}
</script>
