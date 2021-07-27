<template>
    <div class="sort-product">
        <ul class="sort-list"> 
            
            <li class="sort-list-item" v-for="(field, id) in fields" :key="id">
                <Select
                 @selectedItem="updateFiltered"
                 :selectModel="field.model" 
                 :placeholder="field.placeholder" 
                 :options="field.option || options[field.options]"
                 :range="field.range"
                />
            </li>

        </ul>
    </div>
</template>

<script>
import {fields} from '@/pages/men/_id/fields'
export default {
    name: 'SortProduct',
    components: {
        Select: () => import('@/components/Select.vue')
    },
    data() {
        return {
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
                colors: [],
                brand: [],
                sizes: [],
                priceRange: []
            },
            fields
        }
    },
    props: {
        arr: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        genericOptions() {
            let mainArr = JSON.parse(JSON.stringify(this.arr))
            for (let option in this.options) {
                let arr = []

                mainArr.forEach(item => {
                    if (Array.isArray(item[option])) {
                        for (let i of item[option]) {
                            arr.push({name: i, amount: 1})
                        }
                    } else if (option == 'priceRange') {
                        arr.push(item.price)
                    } else {
                        arr.push({name: item[option], amount: 1})
                    }
                })
                if (option == 'priceRange') {
                    
                    if (arr == false) {
                        this.options[option] = [0]
                    } else {
                        let result = Math.max(...arr)
                    
                        this.options[option] = [result]
                    }
                    
                } else {
                    let tempObj = {}
                
                    for ( let { name } of arr )
                        tempObj[name] = { 
                            name, 
                            amount: tempObj[name] ? tempObj[name].amount + 1 : 1
                        }      

                    let sortedArr = Object.values(tempObj)

                    this.options[option] = sortedArr
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
    created() {
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
        arr() {
            this.genericOptions()
        }
    }
}
</script>
