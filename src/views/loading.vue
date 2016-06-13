<template>
    <loading :show="isShow"></loading>
</template>

<script>
import {
    Loading,
} from 'vux/src/components';

export default {
    data() {
            return {
                isShow: true
            }
        },
        ready() {
            setTimeout(() => {
                this.$route.router.go({
                    name: 'main'
                })
            }, 1000);
        },
        components: {
            Loading,
        }
}
</script>
<style></style>
