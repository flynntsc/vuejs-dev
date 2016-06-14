<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">新建任务</x-header>

    <group title="任务信息">
        <selector title="业务主题" value="rcbf" :options='list' @on-change="selChange"></selector>
        <datetime :value.sync="dpText" :min-year='minYear' :max-year="maxYear" title="执行时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
    </group>

    <group title="客户信息" v-if="isEveryday">
        <x-input title="客户名称" readonly required placeholder="请点击选择" :value.sync='userName' :show-clear="false" @click="getUser"></x-input>
        <x-input title="手机号码" readonly placeholder="无需输入" :value.sync='userTel' :show-clear="false"></x-input>
        <x-input title="客户地址" readonly placeholder="无需输入" :value.sync='userAddress' :show-clear="false"></x-input>
        <x-input title="业务代表" readonly placeholder="无需输入" :value.sync='userBusiness' :show-clear="false"></x-input>
    </group>
    <group title="客户信息" v-else>
        <x-input title="客户名称" required placeholder="请手动输入"></x-input>
        <x-input title="手机号码" required placeholder="请手动输入"></x-input>
        <x-input title="客户地址" required placeholder="请手动输入"></x-input>
        <x-input title="业务代表" readonly :value.sync="business" :show-clear="false"></x-input>
    </group>

    <group title="任务描述">
        <x-textarea></x-textarea>
    </group>

    <div class="weui_btn_area">
        <x-button type="primary" @click="submitForm">提交</x-button>
    </div>

    <search v-ref:search :results="results" :value.sync="searchVal" @on-change="getResult" @result-click="resultClick"></search>
</template>

<script>
import {
    XHeader,
    Group,
    XInput,
    Selector,
    XTextarea,
    Datetime,
    XButton,
    Search,
} from 'vux/src/components';

const today = new Date();
const minYear = today.getFullYear();
const maxYear = today.getFullYear() + 1;

export default {
    data() {
            return {
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
                dpText: '请选择日期',
                minYear: minYear,
                maxYear: maxYear,
                isEveryday: true,
                results: [],
                searchVal: '',
            }
        },
        methods: {
            // 触发search的touch
            getUser() {
                this.$refs.search.clear();
                this.$refs.search.touch();
            },
            // 业务主题change
            selChange(val) {
                if (this.list[0].key === val) {
                    this.isEveryday = true
                } else {
                    this.isEveryday = false
                }
            },
            // 客户名称search
            getResult(item) {
                this.$http.get('/api/userlist').then(res => this.results = res.data, err => console.error(err))
            },
            resultClick(val) {
                this.userName = val.title;
                this.userTel = val.tel;
                this.userAddress = val.address;
                this.userBusiness = val.business;
            },
            // 表单提交
            submitForm() {
                // 要提交的假数据
                var postobj = {
                    'title': 'Flyntse',
                    'num': '9898989898',
                }
                this.$http.post('/api/getdata', postobj)
                this.$router.go('/main')
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
            XTextarea,
            Datetime,
            XButton,
            Search,
        },
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
