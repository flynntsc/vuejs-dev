<template>
    <x-header :left-options="{showBack:true,backText:'客户管理'}">
        <selector class="m-hdsel" value="0" :options='whoList' @on-change="tabChange"></selector>
    </x-header>

    <search class="m-searchlist-search" placeholder='客户名称' cancel-text='取消'></search>

    <flexbox style="background:#efeff4;">
        <flexbox-item>
            <selector class="m-tabsel" value="0" :options='timeList' @on-change="tabChange"></selector>
        </flexbox-item>
        <flexbox-item>
            <selector class="m-tabsel" value="0" :options='statList' @on-change="tabChange"></selector>
        </flexbox-item>
        <flexbox-item>
            <selector class="m-tabsel" value="0" :options='typeList' @on-change="tabChange"></selector>
        </flexbox-item>
    </flexbox>

    <scroller v-ref:scroller :height="scrollHeight" lock-x>
        <div class="g-scroller" v-show="!isLoad">
            <div class="m-list" v-for="list in taskList">
                <flexbox>
                    <flexbox-item style="flex:inherit;">任务号：{{list.num}}</flexbox-item>
                    <flexbox-item class="flex-item-1" v-if="list.sign">{{list.sign}}</flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>客户名称：{{list.name}}</flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>任务主题：{{list.type}}</flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>任务状态：{{list.stat}}</flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="m-tip" v-show="isLoad">
            <spinner></spinner>
        </div>
        <div class="m-tip" v-show="notData">暂无数据！</div>
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
    Spinner,
    XButton,
} from 'vux/src/components';

export default {
    data() {
            return {
                scrollHeight: '392px',
                whoList: [{
                    key: '0',
                    value: '我的任务'
                }, {
                    key: '1',
                    value: '他人任务'
                }],
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
                notData:false,
                isLoad: true,
                taskList: [],
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
        compiled() {
            this.scrollHeight = window.screen.height - 176 + 'px';
        },
        ready() {
            this.$http.get('/api/tasklist').then(res => {
                if (res.data.length) {
                    this.taskList = res.data
                    this.isLoad = false;

                    this.$nextTick(() => {
                        this.$refs.scroller.reset()
                    })
                } else {
                	this.notData = true;
                }
            }, err => console.error(err))
        },

        components: {
            XHeader,
            Search,
            Flexbox,
            FlexboxItem,
            Selector,
            Scroller,
            Spinner,
            XButton,
        },
}
</script>
<style lang="scss">
.g-fixbtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

.m-searchlist-search.vux-search-fixed {
    position: relative;
}

.weui_cell_select.m-hdsel {
    .weui_cell_bd {
        &:after {
            right: 50%;
            margin-right: -32px;
        }
    }
    .weui_select {
        width: 120px;
        padding: 0 10px;
        color: #fff;
        option {
            color: #fff;
        }
    }
}

.weui_cell_select.m-tabsel {
    .weui_cell_bd {
        &:after {
            right: 50%;
            margin-right: -32px;
        }
    }
    .weui_select {
        display: block;
        width: 110px;
        margin: 0 auto;
        padding: 0 10px;
    }
}

.m-list {
    position: relative;
    padding: 10px 15px;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        transform: scaley(.5);
        background: #ccc;
    }
    .flex-item-1 {
        text-align: right;
        color: #45b3ee;
    }
}

.m-tip {
    margin-top: 20px;
    text-align: center;
}
</style>
