export const mutations = {
    addToCart(state, product) {
        state.cartItems.push(product)
    },
    editCartItem(state, product) {
        const cartArr = state.cartItems
        state.cartItems = cartArr.map(i => i.uniqueKey == product.uniqueKey ? Object.assign({}, product): i)
    },
    deleteProduct(state, product) {
        const currentInCart = state.cartItems
        state.cartItems = currentInCart.filter(({uniqueKey}) => product.uniqueKey !== uniqueKey)
    },
    setDelivery(state, value) {
        if (value == 'Standart delivery ($6.50)') {
            state.delivery = { name: 'Standart delivery', price: 6.50 }
        } else if (value == 'Express delivery ($20.00)') {
            state.delivery = { name: 'Express delivery', price: 20.00 }
        } else if (value == 'Free delivery') {
            state.delivery = { name: 'Free delivery', price: 0 }
        }
    },
    setPaymentError(state, error) {
        state.paymentError = error
    },
    clearCart(state) {
        state.cartItems = []
    }
}
export const actions = {
    async hundleBuy({getters, commit}, form) {
        try {
            const intent = this.$axios.post('https://nuxt-clothing-store.herokuapp.com/api/v1/payment', {...form})
            return intent
        } catch (error) {
            commit('setPaymentError', error)
        }
    }
}
export const getters = {
    cartSubTotalPrice: ({cartItems}) => cartItems.map(item => item).reduce(function(acc, val) {
        return acc + ((val.newPrice || val.price) * val.quantityOfSelected); 
    }, 0).toFixed(2),
    cartItems: ({cartItems}) => cartItems,
    cartCount: ({cartItems}) => cartItems.length,
    delivery: ({delivery}) => delivery,
    paymentError: ({paymentError}) => paymentError
}
export const state = () => ({
    cartItems: [],
    delivery: null,
    paymentError: null
})