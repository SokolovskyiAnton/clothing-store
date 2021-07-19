<template> <!--кружок загрузки. глобальный компонент-->
    <div class="loader-wrap">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Loader'
}
</script>
<style lang="scss" scoped>
    .loader-wrap {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>