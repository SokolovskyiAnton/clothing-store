<template>
    <div class="sort-product">
        <ul class="sort-list"> 
            <!-- Попробовать сделать автоматическую генерацию опций, закончить сортировку, цена в карточке продукта, подумать над мультиселектом -->
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="optionOfSort"
                    v-model="selected"
                    placeholder="Sort"
                    :select-label="''"
                    deselect-label="remove"
                    @input="sortByPrice()"
                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="options.optionsOfProductType"
                    v-model="filter.styles"
                    placeholder="Style"
                    :select-label="''"
                    deselect-label="remove"
                    @input="sortByStyle()"
                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="options.optionsOfBrand"
                    v-model="filter.brand"
                    placeholder="Brand"
                    :select-label="''"
                    deselect-label="remove"
                ></multiselect>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'SortProduct',
    data() {
        return {
            sortedObj: 0,
            selected: '',
            filter: {
                styles: null,
                colors: null,
                brand: null,
                sizes: null,
                priceRange: null
            },
            optionOfSort: [ 'Price high to low', 'Price low to high' ],
            options: {
                optionsOfProductType: [],
                optionsOfBrand: []
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

            const data = this.sortedObj.products.map(item => item.productType)
            const newData = [...new Set(data)];
            this.optionsOfProductType = newData
        },
        sortByPrice() {
            const obj = this.sortedObj
            const products = obj.products

            if (this.selected === 'Price low to high') {
                products.sort((a, b) => (a.newPrice || a.price) > (b.newPrice || b.price) ? 1 : -1)
                return this.sortedObj = {...obj, products: products}
            } else {
                
                products.sort((a, b) => (a.newPrice || a.price) < (b.newPrice || b.price) ? 1 : -1)
                return this.sortedObj = {...obj, products: products}
            }
        },
        sortByStyle() {

        }
    },
    mounted() {
        this.sortedObj = JSON.parse(JSON.stringify(this.obj))
        this.genericOptions()
    },
    watch: {
        sortedObj() {
            this.$emit('sorted', this.sortedObj)
        },
        obj() {
            this.sortedObj = JSON.parse(JSON.stringify(this.obj))
        }
    }
}
</script>






















<!-- <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="[]"
                    v-model="filter.styles"
                    placeholder="Style"
                    :select-label="''"
                    deselect-label="remove"
                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="[]"
                    v-model="filter.brand"
                    placeholder="Brand"
                    :select-label="''"
                    deselect-label="remove"
                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="[]"
                    v-model="filter.sizes"
                    placeholder="Size"
                    :select-label="''"
                    deselect-label="remove"
                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="[]"
                    v-model="filter.colors"
                    placeholder="Color"
                    :select-label="''"
                    deselect-label="remove"
                ></multiselect>
            </li>
            <li class="sort-list-item">
                <multiselect class="sort-multiselect"
                    :options="[]"
                    v-model="filter.priceRange"
                    placeholder="Price range"
                    :select-label="''"
                    deselect-label="remove"
                ></multiselect>
            </li> -->