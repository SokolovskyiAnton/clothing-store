<template>
    <div class="sort-product">
        <ul class="sort-list"> 
            <!-- Попробовать сделать автоматическую генерацию опций, закончить сортировку, цена в карточке продукта, подумать над мультиселектом -->
            <li class="sort-list-item">
                <Select
                 @selectedItem="updateFiltered"
                 :selectModel="'selected'" 
                 :placeholder="'Sort'" 
                 :options="[ {name: 'Price high to low'}, {name: 'Price low to high'} ]"
                />
            </li>
            <li class="sort-list-item">
                <Select
                 @selectedItem="updateFiltered"
                 :selectModel="'type'" 
                 :placeholder="'Style'" 
                 :options="options.productType"
                />
            </li>
            <li class="sort-list-item">
                <Select
                 @selectedItem="updateFiltered"
                 :selectModel="'color'" 
                 :placeholder="'Color'" 
                 :options="options.colors"
                />
            </li>
            <li class="sort-list-item">
                <Select
                 @selectedItem="updateFiltered"
                 :selectModel="'brand'" 
                 :placeholder="'Brand'" 
                 :options="options.brand"
                />
            </li>
            <li class="sort-list-item">
                <Select
                 @selectedItem="updateFiltered"
                 :selectModel="'size'" 
                 :placeholder="'Size'" 
                 :options="options.sizes"
                />
            </li>
             <li class="sort-list-item">
               <Select
                @selectedItem="updateFiltered"
                :selectModel="'priceRange'"
                :placeholder="'Price range'"
                :options="options.priceRange"
                :range="true"
               />
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'SortProduct',
    components: {
        Select: () => import('@/components/products/Select.vue')
    },
    data() {
        return {
            sortedObj: {},
            filtered: {
                selected: null,
                type: null,
                color: null,
                brand: null,
                size: null,
                priceRange: null
            },
            options: {
                productType: [],
                brand: [],
                colors: [],
                sizes: [],
                priceRange: []
            },
        }
    },
    props: {
        obj: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        
        genericOptions() {
            let mainObj = JSON.parse(JSON.stringify(this.obj))
            for (let item in this.options) {
                let arr = []
                let maxPrice = []
                mainObj.forEach(i => {
                    if (Array.isArray(i[item])) {
                        for (let i of i[item]) {
                            arr.push({name: i, amount: 1})
                        }
                    } else if (item == 'priceRange') {
                        arr.push(i.price)
                    } else {
                        arr.push({name: i[item], amount: 1})
                    }
                })
                if (item == 'priceRange') {
                    let result = Math.max(...arr)
                    this.options[item] = [result]
                } else {
                    let tempObj = {}
                
                    for ( let { name } of arr )
                        tempObj[name] = { 
                            name, 
                            amount: tempObj[name] ? tempObj[name].amount + 1 : 1
                        }      

                    let sortedArr = Object.values(tempObj)

                    this.options[item] = sortedArr
                }
            }
        },
        updateFiltered(item, selected) {
        
            let filtered = this.filtered
            for (let i in filtered) {
                if (i == item) {
                    return this.filtered = {...filtered, [i]: selected}
                }
            }
        }
    },
    mounted() {
        this.filtered = {
            selected: null,
            type: null,
            color: null,
            brand: null,
            size: null,
            priceRange: null
        }
        this.genericOptions()
    },
    watch: {
        filtered: {
            handler() {
                this.$emit('sorted', this.filtered)
            },
            deep: true 
        },
        obj() {
            this.genericOptions()
        }
    }
}
</script>
