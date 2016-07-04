<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">新增客户</x-header>

    <div class="g-bbd">
        <group title="客户类型">
            <radio :options="userRank" :value.sync="userInfo.userRank"></radio>
        </group>
        <group title="接收短信">
            <radio :options="isSms" :value.sync="userInfo.isSms"></radio>
        </group>
        <group title="基础信息">
            <x-input title="客户名称" required placeholder="必填" :show-clear="false" :value.sync="userInfo.userName"></x-input>
            <x-input title="手机号码" required placeholder="必填" :show-clear="false" :value.sync="userInfo.userTel" keyboard="number" is-type="china-mobile"></x-input>
            <selector title="车队分类" :options="motorCat" :value.sync="userInfo.motorCat"></selector>
            <x-input title="业务代表" required placeholder="必填" :show-clear="false" :value.sync="userInfo.userWho"></x-input>
            <address title="业务区域" placeholder="请选择省市（必选）" raw-value hide-district :list="addressData" :value.sync="userPos"></address>
        </group>
    </div>

    <group title="联系信息">
        <x-input title="联系人" :value.sync="userInfo.linkman"></x-input>
        <x-input title="联系电话" :value.sync="userInfo.linkTel"></x-input>
        <address v-ref:address title="所在地区" placeholder="请选择省市区" raw-value :list="addressData" :value.sync="linkArea"></address>
        <x-input title="详细地址" placeholder="请手动填写或点击地图选择" :value.sync="userInfo.linkAddress"></x-input>
    </group>

    <div class="weui_btn_area" v-else>
        <x-button type="primary" @click="btnNext">下一步</x-button>
    </div>

    <toast :show.sync="isWarn" type="warn" width="13em" :time="1500">请将基础信息填写完整</toast>
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
    Toast,
} from 'vux/src/components';
import value2name from 'vux/src/filters/value2name.js'

export default {
    data() {
            return {
                // 数据
                addressData: AddressChinaData,
                userRank: ['个人', '企业'],
                isSms: ['需要', '不需要'],
                motorCat: ['综合物流'],
                // 动态
                isWarn: false,
                userPos: [], // ['数字']
                linkArea: [], // ['数字']
                userInfo: {
                    userRank: '个人',
                    userName: '',
                    userTel: '',
                    isSms: '需要',
                    motorCat: '综合物流',
                    userWho: '',
                    userPos: [], // ['名称']

                    linkman: '',
                    linkTel: '',
                    linkArea: [], // ['名称']
                    linkAddress: '',
                }
            }
        },
        created() {
            // 获取缓存
            let storageObj = JSON.parse(sessionStorage.getItem('userAddData'))
                // 省市值转换
            if (!!storageObj) {
                this.userPos = storageObj.userPos || []
                this.linkArea = storageObj.linkArea || []
                this.userInfo = Object.assign({}, this.userInfo, storageObj)
            }

            // 业务代表默认值
            this.userInfo.userWho = this.userInfo.userWho || localStorage.getItem('loginName')
        },
        ready() {},
        methods: {
            btnNext() {
                // 省市值转换
                this.userInfo.userPos = val2name(this.userPos)
                this.userInfo.linkArea = val2name(this.linkArea)

                // 缓存以便后续使用
                let storageStr = JSON.stringify(this.userInfo)
                sessionStorage.setItem('userAddData', storageStr)

                // 验证判断
                if (this.userInfo.userName.length && this.userInfo.userTel.length && this.userInfo.userWho.length && this.userInfo.userPos.length) {
                    this.$router.go('/user-add-step')
                } else {
                    this.isWarn = true
                }
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
            Toast,
        },
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
