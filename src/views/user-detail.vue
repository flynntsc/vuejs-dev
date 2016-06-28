<template>
    <x-header v-ref:xheader :left-options="{showBack:false}">
        客户详情
        <span class="vux-header-back" slot="left" @click="goBack">返回</span>
    </x-header>

    <group title="基础信息">
        <cell>
            <div slot="icon" :style="styleCellHd">基础信息</div>
            <div>{{userInfo.userName}}</div>
        </cell>
        <cell title="认证类型">
            <div>{{userInfo.userType}}</div>
        </cell>
        <cell>
            <div slot="icon" :style="styleCellHd">业务区域</div>
            <div>{{userInfo.userPos}}</div>
        </cell>
        <cell title="联系人">
            <div>{{userInfo.linkman}}</div>
        </cell>
        <cell title="联系电话">
            <div>{{userInfo.linkTel}}</div>
        </cell>
        <cell>
            <div slot="icon" :style="styleCellHd">联系地址</div>
            <div>{{userInfo.linkAddress}}</div>
        </cell>
    </group>

    <group-title>财富总值：{{userInfo.fortuneSum}} 元</group-title>
    <group class="m-gtg">
        <cell title="基本账户（可用）">
            <div>{{userInfo.fortuneBasic}}</div>
        </cell>
        <cell title="和联信账户（可用）">
            <div>{{userInfo.fortuneHlx}}</div>
        </cell>
        <cell title="积分账户（可用）">
            <div>{{userInfo.fortuneJifen}}</div>
        </cell>
    </group>

    <group-title>信用额度：{{userInfo.creditSum}} 元</group-title>
    <group class="m-gtg">
        <cell title="可用额度">
            <div>{{userInfo.creditSuable}}</div>
        </cell>
        <cell title="未还额度">
            <div>{{userInfo.creditRepay}}</div>
        </cell>
        <cell title="冻结额度">
            <div>{{userInfo.creditFrost}}</div>
        </cell>
    </group>

    <group-title>逾期金额：{{userInfo.overdueSum}} 元</group-title>
    <group class="m-gtg">
        <cell title="小额授信逾期">
            <div>{{userInfo.overdueSmall}}</div>
        </cell>
        <cell title="应收款逾期">
            <div>{{userInfo.overdueGet}}</div>
        </cell>
    </group>

    <div class="weui_btn_area">
        <x-button type="primary" @click="editBtn">基本资料修改</x-button>
    </div>
</template>

<script>
import {
    XHeader,
    Group,
    GroupTitle,
    Cell,
    XButton,
} from 'vux/src/components';

export default {
    data() {
            return {
                styleCellHd: {
                    whiteSpace: 'nowrap',
                    marginRight: '5px',
                },
                userInfo: {
                    userId: '',
                    userName: '',
                    userType: '',
                    userPos: '',
                    userWho: '',
                    linkman: '',
                    linkTel: '',
                    linkAddress: '',

                    fortuneSum: '0.00',
                    fortuneBasic: '0.00',
                    fortuneHlx: '0.00',
                    fortuneJifen: '0.00',

                    creditSum: '0.00',
                    creditSuable: '0.00',
                    creditRepay: '0.00',
                    creditFrost: '0.00',

                    overdueSum: '0.00',
                    overdueSmall: '0.00',
                    overdueGet: '0.00',
                },
            }
        },
        methods: {
            editBtn() {
                this.$router.go('/user-edit?user=' + this.userId);
            },
            goBack() {
                this.$router.go('/user-list');
            },
        },
        ready() {
            this.userId = this.$route.query.user;
            this.$http.get('/api/userinfo').then(res => {
                Object.assign(this.userInfo, res.data)
            }, error => console.error(err))
        },

        components: {
            XHeader,
            Group,
            GroupTitle,
            Cell,
            XButton,
        },
}
</script>
<style>
.g-body {
    background-color: #fbf9fe;
}
</style>
<style lang="scss" scoped>
.weui_cells_title + .m-gtg {
    margin-top: -10px;
}
</style>
