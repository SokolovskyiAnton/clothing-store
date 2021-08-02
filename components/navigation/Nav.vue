<template>
    <div class="nav-shop">
        <div class="nav-header">
          <div class="nav-header-container">
            <div class="nav-header__logo">
              <div>Astore</div>
            </div>
            <div class="nav-header__center">
              <div class="nav-header-list">
                <nuxt-link to="/men" :class="{navLinkActive: getRoute() == 'men'}">Men</nuxt-link>
                <nuxt-link to="/women" :class="{navLinkActive: getRoute() == 'women'}">Women</nuxt-link>
              </div>

              <form @submit.prevent="" class="nav-header-form__container">
                <input class="nav-header-form__search" placeholder="Search items" type="search" >
              </form>
            </div>
            <div class="nav-header-icons-list">
              <div class="nav-header-icons-list__item user-icon">
                <nuxt-link to="/account" class="nav-header-icons-list__item-link">
                  <font-awesome-icon class="fa" icon="user"/>
                </nuxt-link>
                <AccountHoverCard />
              </div>
              <div class="nav-header-icons-list__item">
                <nuxt-link :to="`/cart?gender=${getRoute()}`" class="nav-header-icons-list__item-link cart-item">
                  <font-awesome-icon class="fa" icon="shopping-cart" />
                  <div class="cart-counter" v-show="cartCount">{{cartCount}}</div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-footer">
          <NavCategories />
        </div>
    </div>
</template>

<script>
import { routeMixin } from '@/mixins/route.mixin'
import {mapGetters} from 'vuex'
  export default {
    name: 'Nav',
    mixins: [routeMixin],
    computed: {
      ...mapGetters({
        cartCount: 'cart/cartCount'
      })
    },
    components: {
      AccountHoverCard: () => import('./AccountHoverCard'),
      NavCategories: () => import('./NavCategories')
    },
  
    mounted() {
      this.getRoute()
    }

  }
</script>
