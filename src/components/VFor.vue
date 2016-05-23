<template>
    <div class="m-bd list">
        <h1>{{tit}}</h1>
        <ul class="ul">
            <li class="li" v-for="todo in todos">
                {{todo.text}}
            </li>
        </ul>
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
            tit: '渲染列表',
            todos: [{
                text: 'Learn JavaScript'
            }, {
                text: 'Learn Vue.js'
            }, {
                text: 'Learn Something Awesome'
            }]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ul {
    text-align: left;
}
</style>
