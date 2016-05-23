<template>
    <div class="m-bd">
        <h1>{{tit}}</h1>
        <input class="m-ipt" v-model="newTodo" v-on:keyup.enter="addTodo" placeholder="请输入文字并enter">
        <ul>
            <li v-for="todo in todos" class="li">
                <span>{{ todo.text }}</span>
                <button v-on:click="removeTodo($index)">X</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
            return {
                tit: '综合例子',
                newTodo: '',
                todos: [{
                    text: 'Add some todos'
                }]
            }
        },
        methods: {
            addTodo: function() {
                var text = this.newTodo.trim()
                if (text) {
                    this.todos.push({
                        text: text
                    })
                    this.newTodo = ''
                }
            },
            removeTodo: function(index) {
                this.todos.splice(index, 1)
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.li {
    color: #888;
}

button {
    cursor: pointer;
    font-size: 12px;
    &:hover {
        color: #f00;
    }
}
</style>
