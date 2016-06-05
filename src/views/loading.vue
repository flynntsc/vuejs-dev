<template>
    <div class="loading">
        <spinner></spinner>
    </div>
</template>

<script>
export default {
    ready() {
            setTimeout(() => {
                this.$route.router.go({
                    name: 'main'
                })
            }, 1000);
        },
        components: {
            spinner: require('vux/src/components/spinner')
        }
}
</script>
<style lang="scss">
.loading {
	width:100%;
    text-align: center;
    margin: 50px auto 0;
}
</style>
