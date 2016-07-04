<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">新增油卡</x-header>

    <group title="请选择需办理油卡的车辆">
        <x-input title="客户名称" readonly required placeholder="请点击选择" :value.sync='gascardInfo.userName' :show-clear="false" @click="getUser"></x-input>
        <x-input title="业务区域" readonly placeholder="无需输入" :value.sync='gascardInfo.userPos' :show-clear="false"></x-input>
        <x-input title="优惠方式" readonly placeholder="无需输入" :value.sync='gascardInfo.favorable' :show-clear="false"></x-input>
        <x-input title="车队燃料服务管理协议" readonly placeholder="无需输入" :value.sync='gascardInfo.isAgree' :show-clear="false"></x-input>
        <x-input title="车牌号码" readonly required placeholder="请点击选择" :value.sync='gascardInfo.plateNum' :show-clear="false" @click="getUser"></x-input>
        <x-input title="行驶证" readonly placeholder="无需输入" :value.sync='gascardInfo.driveLicense' :show-clear="false"></x-input>
        <selector title="油卡供应商" value="中石油" :options='gascardSupplier'></selector>
        <address title="主卡所在地区" placeholder="请选择省市（必选）" raw-value hide-district :list="addressData" :value.sync="cardArea"></address>
    </group>
    <group title="短信提醒">
        <radio :options="isReceive" :value.sync="gascardInfo.isReceive"></radio>
    </group>

    <group title="油卡收件信息">
        <x-input title="收件人姓名" required :value.sync="gascardInfo.recipients" :show-clear="false" placeholder="请手动输入" :show-clear="false"></x-input>
        <x-input title="收件人电话" required :value.sync="gascardInfo.recipientsTel" :show-clear="false" placeholder="请手动输入"></x-input>
        <x-input title="收件人地址" required :value.sync="gascardInfo.direction" :show-clear="false" placeholder="请手动输入"></x-input>
    </group>

    <div class="weui_btn_area">
        <x-button type="primary" @click="submitForm">提交</x-button>
    </div>

    <search v-ref:search1 :results="results" :value.sync="searchVal" @on-change="getResult" @result-click="getUserInfo"></search>
</template>

<script>
import {
    XHeader,
    Group,
    XInput,
    Selector,
    Radio,
    XButton,
    Search,
    Address,
    AddressChinaData,
} from 'vux/src/components';

export default {
    data() {
            return {
                addressData: AddressChinaData,
                gascardSupplier: ['中石油', '中石化'],
                isReceive: ['是', '否'],


                userName: '',
                userTel: '',
                userAddress: '',
                userBusiness: '',
                list: [{
                    key: 'rcbf',
                    value: '日常拜访'
                }, {
                    key: 'qzkh',
                    value: '潜在客户'
                }],
                business: '',
                results: [],
                searchVal: '',
                cardArea: [], // 主卡所在地区
                gascardInfo: {
                    userName: '',
                    userPos: '',
                    favorable: '',
                    isAgree: '',

                    plateNum: '',
                    driveLicense: '',

                    supplier: '中石油',
                    cardArea: [],
                    isReceive: '否',

                    recipients: '',
                    recipientsTel: '',
                    direction: '',
                }
            }
        },
        methods: {
            // 触发search的touch
            getUser() {
                this.$refs.search1.clear();
                this.$refs.search1.touch();
            },
            // 客户名称search
            getResult(item) {
                this.$http.get('/api/userlist').then(res => this.results = res.data, err => console.error(err))
            },
            getUserInfo(val) {
                let resObj = {
                    userName: val.title,
                    userPos: val.userPos.join(' '),
                    favorable: val.favorable,
                    isAgree: val.isAgree,
                }
                this.gascardInfo = Object.assign({}, this.gascardInfo, resObj)
            },
            // 表单提交
            submitForm() {
                // 要提交的假数据
                var postobj = {
                    'title': 'Flyntse',
                    'num': '9898989898',
                }

                // 省市值转换
                this.gascardInfo.cardArea = val2name(this.cardArea)
                this.$http.post('/api/getdata', gascardInfo)
            },
        },
        ready() {
            // Ajax获取数据
            this.$http.get('/api/getdata').then(res => {
                this.business = res.data.title || '';
            }, err => console.log(err))
        },
        components: {
            XHeader,
            Group,
            XInput,
            Selector,
            Radio,
            XButton,
            Search,
            Address,
            AddressChinaData,
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
<style scoped>
.vux-search-box {
    display: none;
}

.vux-search-box.vux-search-fixed {
    display: block;
}
</style>
