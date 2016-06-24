<template>
    <x-header v-else :left-options="{showBack:true,backText:'返回'}">新增客户</x-header>

    <div v-if="userType">
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
    </div>

    <div v-else>
        <group title="认证类型">
            <radio :options="acType2" value="1"></radio>
        </group>
        <group title="实名认证信息">
            <cell title="客户名称" :value.sync="userInfo.userName"></cell>
            <x-input title="企业名称" :value.sync="userInfo.userName"></x-input>
            <x-input title="法人代表" :value.sync="userInfo.userNum"></x-input>
            <selector title="法人证件类型" :options="papers" value="1"></selector>
            <x-input title="法人证件号" :value.sync="userInfo.userTel"></x-input>
            <selector title="企业证件类型" :options="papers2" value="1"></selector>
            <x-input title="营业执照号" :value.sync="userInfo.userTel"></x-input>
            <x-input title="组织机构代码证号" :value.sync="userInfo.userTel"></x-input>
            <x-input title="税务登记证号" :value.sync="userInfo.userTel"></x-input>
        </group>
        <group title="资质文件">
            <upload title="营业执照（图片）"></upload>
            <upload title="法人代表证件（图片）"></upload>
            <upload title="税务登记证（图片）"></upload>
            <upload title="组织机构代码证（图片）"></upload>
        </group>
    </div>

    <div class="weui_btn_area" v-if="userType">
        <x-button type="primary" @click="btnAdd">提交</x-button>
    </div>
    <div class="weui_btn_area" v-else>
        <x-button type="primary" @click="btnAdd2">提交</x-button>
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
    XButton,
} from 'vux/src/components';
import Upload from './../components/upload/index.vue'

export default {
    data() {
            return {
                // 参数
                userType: false,
                // 样式
                styleCellHd: {
                    whiteSpace: 'nowrap',
                    marginRight: '5px',
                },
                // 数据

                acType: [{
                    key: '1',
                    value: '营运车主',
                }],
                acType2: [{
                    key: '1',
                    value: '物流企业',
                }],
                papers: [{
                    key: '1',
                    value: '身份证'
                }, {
                    key: '2',
                    value: '护照'
                }, {
                    key: '3',
                    value: '港澳通行证'
                }, {
                    key: '4',
                    value: '台胞证'
                }, {
                    key: '5',
                    value: '其他'
                }],
                papers2:[{
                	key:'1',
                	value:'三证分离（传统）'
                },{
                	key:'2',
                	value:'三证合一（一码）'
                },{
                	key:'3',
                	value:'三证分离（多码）'
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
        created() {
        },
        ready() {

        },
        methods: {
            btnNext() {
                this.nextStep = true;
            },
            btnSave() {
                this.$router.go('/user-detail?user=' + this.userId)
            },
            btnAdd() {
                console.log('新增退出')
            },
            btnAdd2() {
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
