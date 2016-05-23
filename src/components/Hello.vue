<template>
    <div class="hello m-bd">
        <h1>{{ msg }}</h1>
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
            msg: 'Hello World!'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
    text-shadow: 0 5px 20px #f00;
}
</style>
