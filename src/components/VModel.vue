<template>
    <div class="m-bd">
        <h1>{{tit}}</h1>
        <p>{{msg}}</p>
        <input v-model="msg">
    </div>
</template>

<script>
export default {
    data() {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            tit: '双向绑定',
            msg: '双向绑定示范',
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
