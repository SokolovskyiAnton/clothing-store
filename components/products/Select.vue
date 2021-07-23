<template>
    <div class="my-select" @click="openSelect">
        <div class="my-select-block">
            <div class="my-select-placeholder">{{placeholder}}</div>
            <div class="my-select-arrow">
                <font-awesome-icon class="my-select-arrow" :icon="isOpen ? 'angle-down' : 'angle-up'" />
            </div>
        </div>
        <div class="my-select-hidden-block" :class="{hideBlock: isOpen}">
            <ul class="my-select-list" v-if="options && options.length > 0">
                <li class="my-select-list-item" @click="getElem" v-for="(item, id) in options" :key="id">{{item.name}} ({{item.amount}})</li>
            </ul>
            <div class="my-select-empty-list" v-else>List is empty.</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Select',
    data() {
        return {
            isOpen: true,
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
        }
    },
    methods: {
        openSelect() {
            this.isOpen = !this.isOpen
        },
        getElem(e) {
            let selected = e.target.textContent.replace(/[()\d]/g, '').trim() // регулярное выражение, которое удаляет круглые скобки и числа 
            
            for (let item in this.filtered) {
               if (item == this.selectModel) {
                   this.filtered[item] = selected
                   this.$emit('selectedItem', this.filtered)
               }
            }
            console.log(this.filtered);
        }
    }
}
</script>

