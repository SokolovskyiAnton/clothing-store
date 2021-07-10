export const mutations = {
    setSubgategory(state, category) {
        state.category = category
    },
    subcategoryError(state, error) {
        state.productError = error
    }
}
export const actions = {
    async fetchSubcategory({commit}, id) {
        try {
            const item = await this.$axios.get(`http://localhost:5005/api/v1/subcategories/${id}`)
            commit('setSubgategory', item.data)
        } catch (e) {
            commit('subcategoryError', e)
        }
    },
}
export const getters = {
    category: ({category}) => category,
    subcategoryError: ({subcategoryError}) => subcategoryError
}
export const state = () => ({
    category: {},
    subcategoryError: null
})