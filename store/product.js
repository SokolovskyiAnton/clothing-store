export const mutations = {
    setProduct(state, product) {
        state.product = product
    },
    setProducts(state, product) {
        state.products = product
    },
    setProductError(state, error) {
        state.productError = error
    }
}
export const actions = {
    async fetchProduct({commit}, id) {
        try {
            const item = await this.$axios.get(`http://localhost:5005/api/v1/products/${id}`)
            commit('setProduct', item.data)
        } catch (e) {
            commit('setProductError', e)
        }
    },
    async fetchProducts({commit}) {
        try {
            const items = await this.$axios.get(`http://localhost:5005/api/v1/products`)
            commit('setProducts', items.data)
        } catch (e) {
            commit('setProductError', e)
        }
    }
}
export const getters = {
    product: ({product}) => product,
    products: ({products}) => products,
    productError: ({productError}) => productError
}
export const state = () => ({
    product: {},
    products: [],
    productError: null
})