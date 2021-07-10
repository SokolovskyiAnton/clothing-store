<template>
  <div class="app">
    <Navbar/>
    <div class="content">
      <main>
        <Nuxt />
      </main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Default',
  components: {
    Navbar: () => import('@/components/navigation/Nav')
  }
}
</script>
<style>
.app {
  min-height: 100vh;
}
</style>
