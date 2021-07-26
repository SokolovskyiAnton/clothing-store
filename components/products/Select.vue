<template>
    <div class="my-select">
        <div v-if="!rangeMode"  @click="openSelect">
            <div class="my-select-block">
                <div class="my-select-placeholder">{{selected || placeholder}}</div>
                <div class="my-select-arrow">
                    <font-awesome-icon class="my-select-arrow" :icon="isOpen ? 'angle-down' : 'angle-up'" />
                </div>
            </div>
            <div class="my-select-hidden-block" :class="{hideBlock: isOpen}">
                <ul class="my-select-list" v-if="options && options.length > 0">
                    <li class="my-select-list-item" 
                        @click="getElem" 
                        v-for="(item, idx) in options" :key="idx"
                        :class="{selected: item.name == selected}" 
                    ><div>{{item.name}} <span v-if="item.amount">({{item.amount}})</span></div></li>
                </ul>
                <div class="my-select-empty-list" v-else>List is empty.</div>
            </div>
        </div>
        <div v-else>
            <div class="my-select-block" @click="openSelect"> 
                <div class="my-select-placeholder">{{selected || placeholder}}</div>
                <div class="my-select-arrow">
                    <font-awesome-icon class="my-select-arrow" :icon="isOpen ? 'angle-down' : 'angle-up'" />
                </div>
            </div>
            <div class="my-select-hidden-block" :class="{hideBlock: isOpen}">
                <div class="price-range-header">
                    <div class="price-range-header-left">
                        <div class="price-range-header-left-title">Price Range</div>
                        <div class="price-range-header-left-price">
                            ${{0}}  -  ${{filtered.priceRange}}
                        </div>
                    </div>
                    <div class="price-range-header-rigth">
                        <button @click="clearPriceRange" class="price-range-button">CLEAR</button>
                    </div>
                </div>
                <div class="price-range-block" v-if="options && options.length > 0">
                    <div class="price-range-block-wrap">
                        <div class="d-flex justify-content-between w-100"><span>0</span>  <span>${{filtered.priceRange}}</span></div>
                        <input type="range" v-model="filtered.priceRange" @mouseup="priceRangeChange" min="0" :max="maxRange" step="5">
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Select',
    data() {
        return {
            maxRange: null,
            rangeMode: false,
            isOpen: true,
            selected: 0,
            filtered: {
                selected: null,
                type: null,
                color: null,
                brand: null,
                size: null,
                priceRange: null
            }
        }
    },
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        selectModel: {
            type: String,
            default: ''
        },
        range: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        openSelect() {
            this.isOpen = !this.isOpen
        },
        getElem(e) {
            let selected = e.target.textContent.replace(/\(.*\)/s, '').trim() // регулярное выражение, которое удаляет круглые скобки и числа внутри

            for (let i of e.path[0].classList) {
                if (i == 'selected') {
                    selected = null
                }
            }
            this.selected = selected
            this.$emit('selectedItem', this.selectModel, selected)
            
        },
        priceRangeChange() {
            this.$emit('selectedItem', this.selectModel, this.filtered.priceRange)
        },
        clearPriceRange() {
            this.filtered.priceRange = this.maxRange
            this.$emit('selectedItem', this.selectModel, this.filtered.priceRange)
        }
    },
    mounted() {
        this.rangeMode = this.range
        this.filtered.priceRange = this.options[0]
        this.maxRange = JSON.parse(JSON.stringify(this.options[0]))
    }
}
</script>

