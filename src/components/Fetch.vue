<template>
    <div class="m-bd">
        <h1>{{ tit }}</h1>
        <ul class="list">
            <li v-for="item in items">
                {{item.name}} : {{item.age}}
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)

export default {
    data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                tit: 'Fetch例子',
                items: [],
            }
        },
        ready() {
            this.$http.get('/static/json/test1.json').then(res => {
                console.log(res)
                if (res.ok) {
                    res.json().then(data => {
                        this.items = data.list;
                    })
                }
            }).catch(err => {
                console.info(`发生错误：${err}`)
            })
        },
        beforeCompile() {
            fetch('/api/activity').then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data)
                    })
                }
            }).catch(err => {
                console.error('Error:' + err)
            })
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
