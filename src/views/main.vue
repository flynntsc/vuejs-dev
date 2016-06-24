<template>
    <x-header :left-options="{showBack:false}">客户管理</x-header>
    <group>
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
</template>

<script>
import {
    XHeader,
    Group,
    Cell,
} from 'vux/src/components';

export default {
    data() {
            return {
                today_num: 0,
                pass_num: 0,
            }
        },
        ready() {
            // ajax获取数据再更改
            this.today_num = 12;
            this.pass_num = 6;
        },
        components: {
            XHeader,
            Group,
            Cell,
        }
}
</script>
<style>
html{height:100%;}
.g-body{
	background-color:#fbf9fe;
}
</style>
