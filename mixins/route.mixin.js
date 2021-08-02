export const routeMixin = {
    methods: {
        getRoute() {
            if (this.$route.query.gender === "men") {
                return 'men'
            } else if (this.$route.query.gender === "women") {
                return 'women'
            } else {
                const route = this.$route.name
                const arrRoute = route.split('-')
                return arrRoute[0]
            }
            
        }
    }
}