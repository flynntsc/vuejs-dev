<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">修改资料</x-header>

    <group title="基础信息">
        <cell title="客户类型" :value="userInfo.userRank"></cell>
        <x-input title="客户名称" required :value.sync="userInfo.userName"></x-input>
        <cell title="认证类型" :value="userInfo.userType"></cell>
        <selector title="车队分类" :options="motorCat" :value.sync="userInfo.motorCat"></selector>
        <cell title="手机号码" :value="userInfo.userTel"></cell>
        <cell title="接收短信" :value="userInfo.isSms"></cell>
        <x-input title="业务代表" required :show-clear="false" :value.sync="userInfo.userWho"></x-input>
        <cell title="业务区域" :value="userPos"></cell>
        <selector title="优惠方式" :options="favorable" :value.sync="userInfo.favorable"></selector>
    </group>

    <group title="联系信息">
        <x-input title="联系人" :value.sync="userInfo.linkman"></x-input>
        <x-input title="联系电话" :value.sync="userInfo.linkTel"></x-input>
        <address title="所在地区" placeholder="请选择省市区" raw-value :list="addressData" :value.sync="linkArea"></address>
        <x-input title="详细地址" placeholder="路/街道/门牌等" :value.sync="userInfo.linkAddress"></x-input>
    </group>

    <div class="weui_btn_area">
        <x-button type="primary" @click="btnSave">保存</x-button>
    </div>
</template>

<script>
import {
    XHeader,
    Group,
    Cell,
    XInput,
    Selector,
    Radio,
    Address,
    AddressChinaData,
    XButton,
} from 'vux/src/components';
import name2value from 'vux/src/filters/name2value.js'
import value2name from 'vux/src/filters/value2name.js'

export default {
    data() {
            return {
                // 参数
                userId: '',
                // 样式
                styleCellHd: {
                    whiteSpace: 'nowrap',
                    marginRight: '5px',
                },
                // 数据
                addressData: AddressChinaData,
                userType: ['个人', '企业'],
                isSms: ['需要', '不需要'],
                motorCat: ['综合物流'],
                favorable: ['特惠积分', '月结积分（柴油）', '月结积分（汽油）', '月结积分（柴汽油）', '月结'],
                acType: ['营运车主'],
                // 动态
                userPos: '', // 转字符串所需
                linkArea: [], // ['数字']
                userInfo: {
                    userRank: '个人',
                    userName: '',
                    userType: '',
                    userTel: '',
                    isSms: '',
                    motorCat: '',
                    userWho: '',
                    userPos: [], // ['名称']
                    favorable: '',

                    linkman: '',
                    linkTel: '',
                    linkArea: [], // ['名称']
                    linkAddress: '',
                }
            }
        },
        created() {
            // 用户id再请求对应数据
            this.userId = this.$route.query.user;
            this.$http.get('/api/userinfo').then(res => {
                this.userInfo = Object.assign({},this.userInfo, res.data)

                // address赋值
                this.userPos = this.userInfo.userPos.join(' ')
                this.linkArea = judgeAdress(this.userInfo.linkArea)
            }, error => console.error(err))
        },
        ready() {},
        methods: {
            btnSave() {
                this.userInfo.linkArea = val2name(this.linkArea)

                // 验证判断
                if (false) {
                    return;
                }
                this.$router.go('/user-detail?user=' + this.userId)
            },
        },
        components: {
            XHeader,
            Group,
            Cell,
            XInput,
            Selector,
            Radio,
            Address,
            AddressChinaData,
            XButton,
        },
}

// 判断省市区是否规范
function judgeAdress(arr) {
    let parseVal = name2value(arr, AddressChinaData)
    let newVal = parseVal.split(' ');
    if (/__/.test(parseVal)) {
        return []
    } else {
        return newVal;
    }
}
// address数组值->数字转名称
function val2name(v) {
    if (!!v.length) {
        return value2name(v, AddressChinaData).split(' ')
    } else {
        return [];
    }
}
</script>
<style>
.g-body {
    background-color: #fbf9fe;
}
</style>
