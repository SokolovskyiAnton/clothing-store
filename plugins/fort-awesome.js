import Vue from 'vue'
// Добавление плагина иконок.
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faShoppingCart, faSearch, faMinus, faPlus, faArrowRight, faArrowLeft, faCheck, faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faShoppingCart, faSearch, faMinus, faPlus, faArrowRight, faArrowLeft, faCheck, faUser)
Vue.component('font-awesome-icon', FontAwesomeIcon)