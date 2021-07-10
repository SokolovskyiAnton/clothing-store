<template>
    <div class="nav-shop">
        <div class="nav-header">
          <div class="nav-header__logo">
            <div>Astore</div>
          </div>
          <div class="nav-header__center">
            <ul>
              <li>
                <nuxt-link to="/men">Men</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/women">Women</nuxt-link>
              </li>
            </ul>

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
