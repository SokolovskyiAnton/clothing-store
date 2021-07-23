<template>
    <div class="sort-product">
        <ul class="sort-list"> 
            <!-- Попробовать сделать автоматическую генерацию опций, закончить сортировку, цена в карточке продукта, подумать над мультиселектом -->
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="[ 'Price high to low', 'Price low to high' ]"
                    v-model="filtered.selected"
                    placeholder="Sort"
                    :select-label="''"
                    deselect-label="remove"

                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="options.productType"
                    v-model="filtered.type"
                    placeholder="Style"
                    :select-label="''"
                    deselect-label="remove"

                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="options.brand"
                    v-model="filtered.brand"
                    placeholder="Brand"
                    :select-label="''"
                    deselect-label="remove"

                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="options.colors"
                    v-model="filtered.color"
                    placeholder="Color"
                    :select-label="''"
                    deselect-label="remove"
                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="options.sizes"
                    v-model="filtered.size"
                    placeholder="Size"
                    :select-label="''"
                    deselect-label="remove"
                ></multiselect>
            </li>
            <li class="sort-list-item">
                <Select
                 @selectedItem="updateFiltered"
                 :selectModel="'brand'" 
                 :placeholder="'Style'" 
                 :options="[{name: 'adidas', amount: '6'},{name: 'Nike', amount: '2'},{name: 'Nike', amount: '2'}]"
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
                sizes: []
            },
        }
    },
    props: {
        obj: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        genericOptions() {
            let mainObj = JSON.parse(JSON.stringify(this.obj))
            for (let item in this.options) {
                
                let arr = []
                mainObj.products.forEach(i => {
                    if (Array.isArray(i[item])) {
                        arr.push(...i[item])
                    } else {
                        arr.push(i[item])
                    }
                })
                const newArr = [...new Set(arr)].sort()
                this.options[item] = newArr
            }
        },
        updateFiltered(obj) {
            this.filtered = obj
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
        }
    }
}
</script>
