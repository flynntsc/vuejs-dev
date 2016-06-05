<template>
    <x-header :left-options="{showBack:true,backText:'客户管理'}">快速签到</x-header>
    <div class="g-bg">

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

        <group title="任务信息">
            <x-input title="任务编号" readonly :value.sync="taskNum" :show-clear="false"></x-input>
            <selector title="业务主题" value="rcbf" :options='list' @on-change="selChange"></selector>
            <datetime :value.sync="dpText" :min-year='minYear' :max-year="maxYear" title="执行时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
        </group>

        <group title="执行情况描述">
            <x-textarea></x-textarea>
        </group>

        <group title="现场图片">
            <x-input title="选择文件"></x-input>
        </group>

        <div class="weui_btn_area">
            <x-button type="primary">签到并完成</x-button>
        </div>
        <search v-ref:search :results="results" :value.sync="searchVal" @on-change="getResult" @result-click="resultClick"></search>
    </div>
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
                taskNum: '',
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
                this.results = getAjaxData(this.searchVal)
            },
            resultClick(val) {
            	this.userName = val.title;
            	this.userTel = val.tel;
            	this.userAddress = val.address;
            	this.userBusiness = val.business;
            },
        },
        ready() {
            // Ajax获取
            this.business = '张阿三';
            this.taskNum = '12390371283123'
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

function getAjaxData(val) {
    const arr = [{
        title: '张三',
        tel: '13433943324',
        address: '福建省 泉州市 南安县',
        business: '张小三',
    }, {
        title: '李斯',
        tel: '13938243324',
        address: '福建省 泉州市 永春县',
        business: '张小三02',
    }]
    return arr;
}
</script>
<style>
.g-body {
    background-color: #fbf9fe;
}

.vux-search-box {
    display: none;
}

.vux-search-box.vux-search-fixed {
    display: block;
}
</style>
