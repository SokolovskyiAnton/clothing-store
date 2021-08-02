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
            const intent = this.$axios.get('https://nuxt-clothing-store.herokuapp.com/api/v1/payment', {price: getters.cartTotalPrice, ...form})
            return intent
        } catch (error) {
            commit('setPaymentError', error)
        }
    }
}
export const getters = {
    cartTotalPrice: ({cartItems}) => cartItems.map(item => item).reduce(function(acc, val) {
        return acc + ((val.newPrice || val.price) * val.quantityOfSelected); 
    }, 0).toFixed(2),
    cartItems: ({cartItems}) => cartItems,
    cartCount: ({cartItems}) => cartItems.length,
    paymentError: ({paymentError}) => paymentError
}
export const state = () => ({
    cartItems: [],
    paymentError: null
})