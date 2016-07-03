<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">新增客户</x-header>

    <div v-if="isEnterprise">
        <group title="认证类型">
            <radio :options="acType2" value="物流企业"></radio>
        </group>
        <group title="实名认证信息">
            <cell title="客户名称" :value.sync="userInfo.userName"></cell>
            <x-input title="企业名称" required placeholder="必填" :show-clear="false" :value.sync="userInfo.companyName"></x-input>
            <x-input title="法人代表" required placeholder="必填" :show-clear="false" :value.sync="userInfo.legalWho"></x-input>
            <selector title="法人证件类型" :options="papers" :value.sync="userInfo.legalType"></selector>
            <x-input title="法人证件号" required placeholder="必填" :show-clear="false" :value.sync="userInfo.legalNum"></x-input>
            <selector title="企业证件类型" :options="papers2" :value="userInfo.companyCert"></selector>
            <x-input title="营业执照号" required placeholder="必填" :show-clear="false" :value.sync="userInfo.companyNum1"></x-input>
            <x-input title="组织机构代码证号" required placeholder="必填" :show-clear="false" :value.sync="userInfo.companyNum2"></x-input>
            <x-input title="税务登记证号" required placeholder="必填" :show-clear="false" :value.sync="userInfo.companyNum3"></x-input>
        </group>
        <group title="资质文件">
            <upload title="营业执照（图片）" :number.sync="uploadImg01"></upload>
            <upload title="法人代表证件（图片）" :number.sync="uploadImg02"></upload>
            <upload title="税务登记证（图片）" :number.sync="uploadImg03"></upload>
            <upload title="组织机构代码证（图片）" :number.sync="uploadImg04"></upload>
        </group>
    </div>

    <div v-else>
        <group title="认证类型">
            <radio :options="acType" :value.sync="userInfo.userType"></radio>
        </group>
        <group title="实名认证信息">
            <cell title="客户名称" :value.sync="userInfo.userName"></cell>
            <x-input title="真实姓名" required placeholder="必填" :show-clear="false" :value.sync="userInfo.realName"></x-input>
            <x-input title="身份证号" required placeholder="必填" :show-clear="false" :value.sync="userInfo.idNumber"></x-input>
            <x-input title="挂靠企业" required placeholder="必填" :show-clear="false" :value.sync="userInfo.inCompany"></x-input>
            <upload title="挂靠协议（图片）" :number.sync="uploadImg11"></upload>
        </group>
        <group title="资质文件">
            <upload title="身份证（图片）" :number.sync="uploadImg12"></upload>
            <upload title="营运证（图片）" :number.sync="uploadImg13"></upload>
        </group>
    </div>

    <div class="weui_btn_area" v-if="isEnterprise">
        <x-button type="primary" @click="btnAdd">提交</x-button>
    </div>
    <div class="weui_btn_area" v-else>
        <x-button type="primary" @click="btnAdd2">提交</x-button>
    </div>

    <toast :show.sync="isWarn" type="warn" width="10em" :time="1500">请将信息填写完整</toast>
</template>

<script>
import {
    XHeader,
    Group,
    Cell,
    XInput,
    Selector,
    Radio,
    XButton,
    Toast,
} from 'vux/src/components';
import Upload from './../components/upload/index.vue'

export default {
    data() {
            return {
                // 参数
                isEnterprise: false, // 是否企业
                // 数据
                acType: ['营运车主'],
                acType2: ['物流企业'],
                papers: ['身份证', '护照', '港澳通行证', '台胞证', '其他'],
                papers2: ['三证分离（传统）', '三证合一（一码）', '三证分离（多码）'],
                // 动态
                isWarn: false,
                uploadImg01: 0,
                uploadImg02: 0,
                uploadImg03: 0,
                uploadImg04: 0,
                uploadImg11: 0,
                uploadImg12: 0,
                uploadImg13: 0,
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

                    // 个人
                    userType: '营运车主',
                    realName: '',
                    idNumber: '',
                    inCompany: '',

                    // 企业
                    companyName: '', // 企业名称
                    legalWho: '', // 法人代表
                    legalType: '身份证', // 法人证件类型
                    legalNum: '', // 法人证件号码
                    companyCert: '三证分离（传统）', // 企业证件类型
                    companyNum1: '', // 企业执照号
                    companyNum2: '', // 组织机构代码证号
                    companyNum3: '', // 税务登记证号

                }
            }
        },
        created() {
            // 获取缓存
            let storageObj = JSON.parse(sessionStorage.getItem('userAddData'))

            // 初始化
            if (!!storageObj) {
                this.isEnterprise = storageObj.userRank === '企业' ? true : false;
                this.userInfo = Object.assign({},this.userInfo, storageObj)
            }
        },
        ready() {},
        methods: {
            btnAdd() {
                if (this.userInfo.companyName.length && this.userInfo.legalWho.length && this.userInfo.legalNum.length && this.userInfo.companyNum1.length && this.userInfo.companyNum2.length && this.userInfo.companyNum3.length && this.uploadImg01 && this.uploadImg02 && this.uploadImg03 && this.uploadImg04) {
                    this.$router.go('/user-detail')
                } else {
                    this.isWarn = true;
                }
            },
            btnAdd2() {
                if (this.userInfo.realName.length && this.userInfo.idNumber.length && this.userInfo.inCompany.length && this.uploadImg11 && this.uploadImg12 && this.uploadImg13) {
                    this.$router.go('/user-detail')
                } else {
                    this.isWarn = true;
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
            XButton,
            Upload,
            Toast,
        },
}
</script>
<style>
.g-body {
    background-color: #fbf9fe;
}
</style>
