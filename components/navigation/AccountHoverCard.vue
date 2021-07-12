<template>
  <div class="account-hover-card">
            <div class="account-header">
                <div class="account-header-left">
                    <nuxt-link to="/auth/login">Sign in</nuxt-link>
                    <span>|</span>
                    <nuxt-link to="/auth/register">Join</nuxt-link>
                </div>
                <div class="account-header-rigth">
                    <font-awesome-icon class="fa fa-times" icon="times"/>
                </div>
            </div>
            <div class="account-footer">
                <nuxt-link to="/account" class="account-footer-link">
                    <font-awesome-icon class="fa" icon="user"/>
                    <span>My Account</span>
                </nuxt-link>
                <nuxt-link to="/account/orders" class="account-footer-link">
                    <font-awesome-icon class="fa" icon="list-alt"/>
                    <span>My Orders</span>
                </nuxt-link>
            </div>
    </div>
</template>

<script>
  export default {
    name: 'AccountHoverCard'
  }
</script>
<style lang="scss">
@import '@/assets/style/global.scss';
</style>