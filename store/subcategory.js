export const mutations = {
    setSubgategory(state, category) {
        state.subcategory = category
    },
    subcategoryError(state, error) {
        state.productError = error
    }
}
export const actions = {
    async fetchSubcategory({commit}, id) {
        try {
            const item = await this.$axios.get(`https://nuxt-clothing-store.herokuapp.com/api/v1/subcategories/${id}`)
            commit('setSubgategory', item.data)
        } catch (e) {
            commit('subcategoryError', e)
        }
    },
}
export const getters = {
    subcategory: ({subcategory}) => subcategory,
    subcategoryError: ({subcategoryError}) => subcategoryError
}
export const state = () => ({
    subcategory: {},
    subcategoryError: null
})