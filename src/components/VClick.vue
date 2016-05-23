<template>
    <div class="m-bd">
        <h1>{{tit}}</h1>
        <p>{{msg}}</p>
        <button v-on:click="clickFnc">点我触发事件</button>
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
                tit: '点击触发事件',
                msg: 'Hello Click Function!',
            }
        },
        methods: {
            clickFnc: function() {
                this.msg = this.msg.split('').reverse().join('');
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
