import Vue from 'vue'
// Добавление плагина иконок.
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faShoppingCart, faSearch, faMinus, faPlus, faArrowRight, faArrowLeft, faCheck, faUser, faListAlt, faTimes, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faShoppingCart, faSearch, faMinus, faPlus, faArrowRight, faArrowLeft, faCheck, faUser, faListAlt, faTimes, faAngleDown, faAngleUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)