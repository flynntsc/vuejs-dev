<template>
    <x-header :left-options="{showBack:false}">
        <div v-show="tabShow.tab1" transition="move2left">消息任务</div>
        <div v-show="tabShow.tab2" transition="move2left">客户管理</div>
        <div v-show="tabShow.tab3" transition="move2left">业务协作</div>
    </x-header>

    <div styles="position:relative;">
        <group v-show="tabShow.tab1" transition="move2left">
            <div class="g-bg">
                <cell link="/remind-overdue" :inline-desc="remindText">
                    <span slot="after-title">逾期提醒</span>
                </cell>
                <cell link="/task-list" :inline-desc="taskText">
                    <span slot="after-title">今日任务</span>
                </cell>
            </div>
        </group>

        <group v-show="tabShow.tab2" transition="move2left">
            <div class="g-bg">
                <cell link="/user-list">
                    <span slot="after-title">客户列表</span>
                </cell>
                <cell link="/remind-today">
                    <span slot="after-title">今日到期提醒（{{today_num}}）</span>
                </cell>
                <cell link="/remind-overdue">
                    <span slot="after-title">逾期提醒（{{pass_num}}）</span>
                </cell>
                <cell link="/task-list">
                    <span slot="after-title">任务管理</span>
                </cell>
                <cell link="/fast-sign">
                    <span slot="after-title">快速签到</span>
                </cell>
            </div>
        </group>

        <group v-show="tabShow.tab3" transition="move2left">
            <div class="g-bg">
                <cell link="/#">
                    <span slot="after-title">加油卡业务</span>
                </cell>
                <cell link="/#">
                    <span slot="after-title">小额授信</span>
                </cell>
                <cell link="/#">
                    <span slot="after-title">油卡工本费账单</span>
                </cell>
            </div>
        </group>
    </div>

    <tabbar>
        <tabbar-item show-dot selected @click="tab1Fn">
            <i slot="icon" class="weui_icon weui_icon_waiting"></i>
            <span slot="label">消息任务</span>
        </tabbar-item>
        <tabbar-item @click="tab2Fn">
            <i slot="icon" class="weui_icon weui_icon_success"></i>
            <span slot="label">客户管理</span>
        </tabbar-item>
        <tabbar-item @click="tab3Fn">
            <i slot="icon" class="weui_icon weui_icon_info"></i>
            <span slot="label">业务协作</span>
        </tabbar-item>
    </tabbar>
</template>

<script>
import {
    XHeader,
    Group,
    Cell,
    Tabbar,
    TabbarItem,
} from 'vux/src/components';

export default {
    data() {
            return {
                // 切换
                tabShow: {
                    tab1: true,
                    tab2: false,
                    tab3: false,
                },
                // 数据
                remindText: '至今有0笔款项逾期',
                taskText: '您有0个新任务',

                today_num: 0,
                pass_num: 0,
            }
        },
        ready() {
            // ajax获取数据再更改
            this.remindText = `至今有99笔款项逾期`;
            this.taskText = `您有11个新任务`;

            this.today_num = 12;
            this.pass_num = 6;
        },
        methods: {
            tab1Fn() {
                this.tabShow.tab1 = true;
                this.tabShow.tab2 = false;
                this.tabShow.tab3 = false;
            },
            tab2Fn() {
                this.tabShow.tab1 = false;
                this.tabShow.tab2 = true;
                this.tabShow.tab3 = false;
            },
            tab3Fn() {
                this.tabShow.tab1 = false;
                this.tabShow.tab2 = false;
                this.tabShow.tab3 = true;
            },
        },
        components: {
            XHeader,
            Group,
            Cell,
            Tabbar,
            TabbarItem,
        }
}
</script>
<style>
html {
    height: 100%;
}

.g-body {
    background-color: #fbf9fe;
}

.move2left-transition {
    transition: transform .2s ease;
    transform: translate3d(0, 0, 0);
}

.move2left-enter {
    transform: translate3d(100%, 0, 0);
}

.move2left-leave {
    position: absolute;
    width:100%;
    transition: all 0s;
    /* transform: translate3d(100%, 0, 0); */
}
</style>
