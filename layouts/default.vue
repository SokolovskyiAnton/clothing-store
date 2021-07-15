<template>
  <div class="app">
    <Navbar/>
    <div class="content">
      <main>
        <Nuxt />
      </main>
      <Footer />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Default',
  components: {
    Navbar: () => import('@/components/navigation/Nav'),
    Footer: () => import('@/components/Footer')
  }
}
</script>
<style>

</style>
