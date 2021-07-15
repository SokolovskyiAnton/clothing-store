<template>
    <div class="nav-footer-container">
        <ul class="nav-footer-categories" >
                <li class="categories-item" v-for="(category, id) in sortCategoriesByGender" :key="id">
                    {{category.title}}
                    <SubcategoryCard :category="category"/>               
                </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'NavCategories',
    components: {
        SubcategoryCard: () => import('./SubcategoryCard.vue')
    },
    methods: {
        ...mapActions({
            fetchCategories: 'category/fetchCategories'
        }),
        getRoute() {
            const route = this.$route.name
            const arrRoute = route.split('-')
            return arrRoute[0]
        }
        
    },
    computed: {
        ...mapGetters({
            categories: 'category/categories'
        }),
        sortCategoriesByGender() {
            let category = JSON.parse(JSON.stringify(this.categories))
            function sortArr(payload, gender) {
                let newArr = []
                for (let i = 0; i < payload.length; i++) {
                    let obj = payload[i]
                    let subcat = obj.subcategories.filter(item => item.gender === gender)
                    newArr.push({...obj, subcategories: subcat})
                }
                return newArr
            }

            if (this.getRoute() === 'men') {
                const sortByMen = sortArr(category, 'men')
                return sortByMen
            }
            if (this.getRoute() === 'women') {
                const sortByWomen = sortArr(category, 'women')
                return sortByWomen
            }
            
        }
        
    },
    async mounted() {
        await this.fetchCategories()
        this.getRoute()
    }
  }
</script>
