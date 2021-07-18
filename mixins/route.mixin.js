export const routeMixin = {
    methods: {
        getRoute() {
            const route = this.$route.name
            const arrRoute = route.split('-')
            return arrRoute[0]
        }
    }
}