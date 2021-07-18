<template>
    <div aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item " v-for="(index, key) in crumbs" :key="key">
                <nuxt-link :to="`${index.path}`">
                    {{index.name}}
                </nuxt-link>
            </li>
            
        </ol>
    </div>
</template>

<script>
  export default {
    name: 'BreadCrumbs',
    methods: {
        ucFirst(str) {
            return str[0].toUpperCase() + str.slice(1);
        }
    },
    computed: {
        crumbs() {
            const route = this.$route.path
            const routeArr = route.split('/').filter(el => el != "")
            const crumbs = []
            let path = ''

            routeArr.forEach((param, index) => {
                path = `${path}/${param}`
                crumbs.push({
                    name: this.ucFirst(param),
                    path: path
                })

            })
            return crumbs   
        }
    }
  }
</script>
