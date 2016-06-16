<template style="background:#fff;">
    <x-header :left-options="{showBack:true,backText:'返回'}">客户列表
        <div class="m-schbtn" slot="right">搜索</div>
    </x-header>

    <div class="g-userhd">
        <cell>
            <div class="icon" slot="icon">客户总数：<span style="color:#ec6f26;">{{numSum}}</span>个</div>
            <div style="font-size:14px;">新增 +</div>
        </cell>
        <cell>
            <div style="font-size:14px;color:#666;" slot="icon">已认证：{{numYes}}</div>
            <div style="font-size:14px;color:#666;">未认证：{{numNot}}</div>
        </cell>
    </div>
    <group>
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
    </group>
</template>

<script>
import {
    XHeader,
    Group,
    Cell,
    XSelect,
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
                numSum: '3293',
                numYes: '1239',
                numNot: '2039',
                notData: false,
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
            this.scrollHeight = window.screen.height - 132 - 15 + 'px';
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
            Group,
            Cell,
            XSelect,
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
<style scoped>
.g-userhd {
    position: relative;
    background: #fff;
}
</style>
<style lang="scss">
.g-body {
    background-color: #fbf9fe;
}

.g-userhd:after {
    content: '';
    display: block;
    border-bottom: 1px solid #d9d9d9;
    transform: scaleY(.5);
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
