export const mutations = {
    setCategories(state, categories) {
        state.categories = categories
    },
    categoryError(state, error) {
        state.productError = error
    }
}
export const actions = {
    async fetchCategories({commit}) {
        try {
            const items = await this.$axios.get('http://localhost:5005/api/v1/categories')
            commit('setCategories', items.data)
        } catch (e) {
            commit('categoryError', e)
        }
    },
}
export const getters = {
    categories: ({categories}) => categories,
    categoryError: ({categoryError}) => categoryError
}
export const state = () => ({
    categories: [],
    categoryError: null
})