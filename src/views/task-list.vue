<template>
    <x-header :left-options="{showBack:true,backText:'客户管理'}">任务管理</x-header>

    <search placeholder='客户名称' cancel-text='取消'></search>

    <flexbox style="background:#efeff4;">
        <flexbox-item>
            <selector value="0" :options='timeList' @on-change="tabChange"></selector>
        </flexbox-item>
        <flexbox-item>
            <selector value="0" :options='statList' @on-change="tabChange"></selector>
        </flexbox-item>
        <flexbox-item>
            <selector value="0" :options='typeList' @on-change="tabChange"></selector>
        </flexbox-item>
    </flexbox>

    <!-- <div class="g-scroller">
    </div> -->
    <scroller height="393px" lock-x>
        <div class="g-wrap">
        	<div class="bd" v-for="i in 50">内容 {{i}}</div>
        </div>
    </scroller>

    <div class="g-fixbtn">
        <x-button type="primary" @click="btnLink">创建任务</x-button>
    </div>
</template>

<script>
import {
    XHeader,
    Search,
    Flexbox,
    FlexboxItem,
    Selector,
    Scroller,
    XButton,
} from 'vux/src/components';

export default {
    data() {
            return {
                timeList: [{
                    key: '0',
                    value: '今日任务'
                }, {
                    key: '1',
                    value: '所有任务'
                }, {
                    key: '2',
                    value: '本周任务'
                }, {
                    key: '3',
                    value: '本月任务'
                }],
                statList: [{
                    key: '0',
                    value: '所有状态'
                }, {
                    key: '1',
                    value: '待执行'
                }, {
                    key: '2',
                    value: '执行中'
                }, {
                    key: '3',
                    value: '已完成'
                }, {
                    key: '4',
                    value: '已取消'
                }],
                typeList: [{
                    key: '0',
                    value: '所有主题'
                }, {
                    key: '1',
                    value: '日常拜访'
                }, {
                    key: '2',
                    value: '潜在客户'
                }],
            }
        },
        methods: {
            btnLink() {
                this.$router.go('/task-add');
            },
            tabChange() {
                console.log('tabChange');
            },
        },
        ready() {},
        components: {
            XHeader,
            Search,
            Flexbox,
            FlexboxItem,
            Selector,
            Scroller,
            XButton,
        },
}
</script>
<style>
.g-fixbtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

.g-scroller {
    position: fixed;
    top: 134px;
    bottom: 42px;
    width: 100%;
}

.vux-search-box.vux-search-fixed {
    position: relative;
}

.vux-flexbox-item .weui_cell_select .weui_select {
    padding-right: 20px;
}

.vux-flexbox-item .weui_select {
    padding-left: 10px;
}
</style>
