<template>
    <x-header :left-options="{showBack:true,backText:''}">客户管理</x-header>
    <div class="g-bg">
        <cell link="http://cn.bing.com">
            <span slot="after-title">客户列表</span>
        </cell>
        <cell link="#link02">
            <span slot="after-title">今日到期提醒（{{today_num}}）</span>
        </cell>
        <cell link="#link03">
            <span slot="after-title">逾期提醒（{{pass_num}}）</span>
        </cell>
        <cell link="#link04">
            <span slot="after-title">任务管理</span>
        </cell>
        <cell link="/fast_sign">
            <span slot="after-title">快速签到</span>
        </cell>
    </div>
</template>

<script>
import {
    XHeader,
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
            Cell,
        }
}
</script>
<style lang="less" scoped>
.g-bg {
    background-color: #fff;
}
</style>
