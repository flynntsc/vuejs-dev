<template>
    <x-header v-if="isEdit" :left-options="{showBack:true,backText:'返回'}">修改资料</x-header>
    <x-header v-else :left-options="{showBack:true,backText:'返回'}">新增客户</x-header>

    <group title="基础信息" v-if="isEdit">
        <cell title="客户类型" :value="userInfo.Name"></cell>
        <x-input title="客户名称" required :value.sync="userInfo.userName"></x-input>
        <cell title="认证类型" :value="userInfo.userName"></cell>
        <selector title="车队物流" :options="motorCat" value="1"></selector>
        <cell title="手机号码" :value="userInfo.userTel"></cell>
        <cell title="接收短信" :value="userInfo.userTel"></cell>
        <x-input title="业务代表" required :value.sync="userInfo.userName"></x-input>
        <cell title="业务区域" :value="userInfo.userAddress"></cell>
        <selector title="优惠方式" :options="favorableWay" value="1"></selector>
    </group>

    <div class="g-bbd" v-if="!isEdit" v-show="!nextStep">
        <group title="客户类型">
            <radio :options="userType" value="0"></radio>
        </group>
        <group title="接收短信">
            <radio :options="isNote" value="1"></radio>
        </group>
        <group title="基础信息">
            <cell title="客户类型" :value="userInfo.Name"></cell>
            <x-input title="客户名称" required :value.sync="userInfo.userName"></x-input>
            <x-input title="手机号码" required :value.sync="userInfo.userTel"></x-input>
            <selector title="车队分类" :options="motorCat" value="zhwl"></selector>
            <x-input title="业务代表" required :value.sync="userInfo.userName"></x-input>
            <address title="业务区域" placeholder="请选择省市" raw-value hide-district :list="addressData"></address>
        </group>
    </div>

    <group title="联系信息" v-show="!nextStep">
        <x-input title="联系人" :value.sync="userInfo.userName"></x-input>
        <x-input title="联系电话" :value.sync="userInfo.userTel"></x-input>
        <address title="所在地区" placeholder="请选择省市区" raw-value :list="addressData"></address>
        <x-input title="详细地址" placeholder="请手动填写或点击地图选择" :value.sync="userInfo.userTel"></x-input>
    </group>

    <div class="weui_btn_area" v-if="isEdit">
        <x-button type="primary" @click="btnSave">保存</x-button>
    </div>
    <div class="weui_btn_area" v-if="!isEdit" v-show="!nextStep">
        <x-button type="primary" @click="btnNext">下一步</x-button>
    </div>

    <!-- 步骤2 -->
    <div v-show="nextStep">
        <group title="认证类型">
            <radio :options="acType" value="1"></radio>
        </group>
        <group title="实名认证信息">
            <cell title="客户名称" :value.sync="userInfo.userName"></cell>
            <x-input title="真实姓名" :value.sync="userInfo.userName"></x-input>
            <x-input title="身份证号" :value.sync="userInfo.userNum"></x-input>
            <x-input title="挂靠企业" :value.sync="userInfo.userName"></x-input>
            <upload title="挂靠协议（图片）"></upload>
        </group>
        <group title="资质文件">
            <upload title="身份证（图片）"></upload>
            <upload title="营运证（图片）"></upload>
        </group>

        <div class="weui_btn_area">
            <x-button type="primary" @click="btnAdd">提交</x-button>
        </div>
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
import Upload from './../components/upload/index.vue'

export default {
    data() {
            return {
                // 参数
                isEdit: false,
                userId: '',
                nextStep: false,
                // 样式
                styleCellHd: {
                    whiteSpace: 'nowrap',
                    marginRight: '5px',
                },
                // 数据
                addressData: AddressChinaData,
                userType: [{
                    key: '0',
                    value: '个人'
                }, {
                    key: '1',
                    value: '企业'
                }],
                isNote: [{
                    key: '1',
                    value: '需要'
                }, {
                    key: '0',
                    value: '不需要'
                }],
                motorCat: [{
                    key: '1',
                    value: '综合物流'
                }],
                favorableWay: [{
                    key: '1',
                    value: '特惠积分',
                }, {
                    key: '2',
                    value: '月结积分（柴油）',
                }, {
                    key: '3',
                    value: '月结积分（汽油）',
                }, {
                    key: '4',
                    value: '月结积分（柴汽油）',
                }, {
                    key: '5',
                    value: '月结',
                }],

                acType: [{
                    key: '1',
                    value: '营运车主',
                }],
                userInfo: {
                    userName: '',
                    userType: '',
                    userPos: '',
                    userWho: '',
                    linkman: '',
                    linkTel: '',
                    linkAddress: '',
                }
            }
        },
        beforeCompile() {
            // 判断新建or编辑
            if (!!this.$route.query.user) {
                this.isEdit = true;
                this.userId = this.$route.query.user;
            }
        },
        ready() {
            this.$http.get('/api/userinfo').then(res => {
                Object.assign(this.userInfo, res.data)
            }, error => console.error(err))
        },
        methods: {
            btnNext() {
                this.nextStep = true;
            },
            btnSave() {
                console.log('保存退出')
            },
            btnAdd() {
                console.log('新增退出')
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
            Upload,
        },
}
</script>
<style>
.g-body {
    background-color: #fbf9fe;
}
</style>
