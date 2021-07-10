export const mutations = {
    addToCart(state, product) {
        state.cartItems.push(product)
    }
}
export const actions = {

}
export const getters = {
    cartTotalPrice: ({cartItems}) => cartItems.map(item => item.price).reduce((x, y) => x + y),
    cartItems: ({cartItems}) => cartItems,
    cartCount: ({cartItems}) => cartItems.length,
    paymentError: ({paymentError}) => paymentError
}
export const state = () => ({
    cartItems: [],
    paymentError: null
})