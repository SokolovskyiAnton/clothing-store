<template>
    <div class="subcategory-card-wrap">
       <div class="subcategory-card-container">
           <div class="subcategories-card">
                <div class="subcategories-left">
                        <div class="subcategories-title"><span>SHOP BY PRODUCT</span></div>
                        <ul  class="subcategories-list">
                            <li class="subcategories-item" v-for="(subcategory, key) in category.subcategories" :key="key">
                                <nuxt-link :to="`/${getRoute()}/products/${subcategory._id}`">{{subcategory.title}}</nuxt-link>
                            </li>
                        </ul>
                </div>
            </div>
       </div>
    </div>
</template>

<script>
  export default {
    name: 'SubcategoryCard',
    props: {
        category: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        getRoute() {
            const route = this.$route.name
            const arrRoute = route.split('-')
            return arrRoute[0]
        }
        
    }
  }
</script>
