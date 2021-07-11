<template>
    <div class="nav-shop">
        <div class="nav-header">
          <div class="nav-header__logo">
            <div>Astore</div>
          </div>
          <div class="nav-header__center">
            <div class="nav-header-list">
              <nuxt-link to="/men" :class="{navLinkActive: this.$route.name == 'men'}">Men</nuxt-link>
              <nuxt-link to="/women" :class="{navLinkActive: this.$route.name == 'women'}">Women</nuxt-link>
            </div>

            <form @submit.prevent="" class="d-flex align-items-center nav-header-form__container">
              <span><font-awesome-icon class="fa" icon="search" /></span>
              <input class="nav-header-form__search me-2" type="search" >
            </form>
          </div>
        </div>
        <div class="nav-footer"></div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss">
@import '@/assets/style/global.scss';
</style>
