<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">客户新增
        <div class="m-schbtn" slot="right" @click="showSearch = true">搜索</div>
    </x-header>

    <div class="g-userhd">
        <cell>
            <div class="icon" slot="icon">客户总数：<span style="color:#ec6f26;">{{numSum}}</span>个</div>
            <div class="f-fs14" @click="btnAdd">新增 +</div>
        </cell>
        <!-- <cell>
            <div class="u-cellitem" slot="icon">已认证：{{numYes}}</div>
            <div class="u-cellitem">未认证：{{numNot}}</div>
        </cell> -->
    </div>
    <tab>
        <tab-item :selected="mytab === '0'" @click="mytab = '0'">全部</tab-item>
        <tab-item :selected="mytab === '1'" @click="mytab = '1'">已认证</tab-item>
        <tab-item :selected="mytab === '2'" @click="mytab = '2'">未认证</tab-item>
    </tab>
    <!-- <group> -->
        <scroller style="background:#fff;" v-ref:scroller :height="scrollHeight" lock-x>
            <div class="g-scroller" v-show="!isLoad">
                <div class="m-list" v-for="(i,list) in taskList">
                    <div class="bd" @click="showBtn(i)">
                        <flexbox>
                            <flexbox-item :style="inheritStyle">{{list.title}}</flexbox-item>
                            <flexbox-item class="f-tar"><span :class="[list.isv ? 'u-ico-v' : 'u-ico-what']"></span>{{list.job}}</flexbox-item>
                        </flexbox>
                        <flexbox>
                            <flexbox-item :style="inheritStyle">手机：{{list.tel}}</flexbox-item>
                            <flexbox-item class="f-tar"><span class="u-ico-up" :class="{'z-crt':list.isShow}"></span></flexbox-item>
                        </flexbox>
                        <flexbox>
                            <flexbox-item>地址：{{list.address}}</flexbox-item>
                        </flexbox>
                    </div>
                    <flexbox :class="['m-listfd',{'z-crt':list.isShow}]">
                        <flexbox-item class="m-listfd-item" @click="btnDetail">查看详情</flexbox-item>
                        <flexbox-item class="m-listfd-item" @click="btnPlan(list.userid)">添加计划</flexbox-item>
                        <flexbox-item class="m-listfd-item" @click="btnTask">所有任务</flexbox-item>
                    </flexbox>
                </div>
            </div>
            <div class="m-tip" v-show="isLoad">
                <spinner></spinner>
            </div>
            <div class="m-tip" v-show="notData">暂无数据！</div>
        </scroller>
    <!-- </group> -->

    <!-- 搜索 -->
    <actionsheet2 :show.sync="showSearch" :has-cancel="hasCancel">
        <x-input title="客户名称" placeholder="名称过滤"></x-input>
        <selector title="认证类型" value="0" :options="typeList"></selector>
        <x-input title="手机号码" placeholder="手机过滤"></x-input>
        <selector title="客户状态" value="0" :options="statusList"></selector>
        <div class="weui_actionsheet_cell">搜索</div>
    </actionsheet2>
    <!-- 添加计划 -->
    <actionsheet2 :show.sync="showPlan" :has-cancel="hasCancel">
        <cell title="任务编号"><span slot="value">1231231231</cell>
        <cell title="业务主题"><span slot="value">日常拜访</cell>
        <datetime style="color:#333;" :value.sync="dpText" :min-year='minYear' :max-year="maxYear" title="执行时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
	    <x-textarea placeholder="任务表述"></x-textarea>
        <div class="weui_actionsheet_cell">提交</div>
    </actionsheet2>
</template>

<script>
import {
    XHeader,
    Group,
    Cell,
    Tab,
    TabItem,
    XSelect,
    Search,
    Flexbox,
    FlexboxItem,
    Selector,
    Scroller,
    Spinner,
    XButton,
    XInput,
    Datetime,
    Dialog,
    Actionsheet,
    XTextarea,
} from 'vux/src/components';
import Actionsheet2 from '../components/actionsheet2/index.vue'

const today = new Date();
const minYear = today.getFullYear();
const maxYear = today.getFullYear() + 1;

export default {
    data() {
            return {
            	// 样式
                inheritStyle: {
                    flex: 'inherit'
                },
                // 首次载入
                scrollHeight: '392px',
                numSum: '3293',
                numYes: '1239',
                numNot: '2039',
                // 变更
                mytab: '0',
                notData: false,
                isLoad: true,
                showSearch:false,
                showPlan: false,
                // 设置
                hasCancel: true,
                minYear:minYear,
                maxYear:maxYear,
                dpText:'请点击选择时间',
                // 数据
                taskList: [],
                typeList:[{
                	key:'0',value:'全部'
                },{
                	key:'1',value:'个人'
                },{
                	key:'2',value:'营运车主'
                },{
                	key:'3',value:'乘用车'
                },{
                	key:'4',value:'物流企业'
                },{
                	key:'5',value:'供应商'
                }],
                statusList:[{
                	key:'0',value:'全部'
                },{
                	key:'1',value:'禁用客户'
                },{
                	key:'2',value:'申请禁用'
                },{
                	key:'3',value:'有效'
                },{
                	key:'4',value:'申请解禁'
                },{
                	key:'5',value:'待激活'
                }],
            }
        },
        methods: {
            btnAdd() {
                this.$router.go('/user-add');
            },
            showBtn(i) {
                this.taskList[i].isShow = !this.taskList[i].isShow;
                this.$nextTick(() => {
                    this.$refs.scroller.reset()
                })
            },
            tabChange() {
                console.log('tabChange');
            },
            btnDetail() {
                this.$router.go('/user-detail')
            },
            btnPlan(id) {
                console.log(id)
                this.showPlan = true;
            },
            btnTask() {
                this.$router.go('/task-list')
            },
            btnPlanOff() {
                this.showPlan = false;
            },
        },
        compiled() {
            this.scrollHeight = window.screen.height - 132 + 'px';
        },
        ready() {
            this.$http.get('/api/userlist').then(res => {
                if (!res.data.length) {
                    return this.notData = true;
                }
                res.data.map((v, i) => {
                    return Object.assign(v, {
                        isShow: false
                    })
                })
                this.taskList = res.data;
                this.isLoad = false;

                this.$nextTick(() => {
                    this.$refs.scroller.reset()
                })
            }, err => console.error(err))
        },

        components: {
            XHeader,
            Group,
            Cell,
            Tab,
            TabItem,
            XSelect,
            Search,
            Flexbox,
            FlexboxItem,
            Selector,
            Scroller,
            Spinner,
            XButton,
            XInput,
            Datetime,
            Dialog,
            Actionsheet,
            Actionsheet2,
            XTextarea,
        },
}
</script>
<style lang="scss">
.g-body {
    background-color: #fbf9fe;
}
</style>
<style lang="scss" scoped>
.g-userhd {
    position: relative;
    background: #fff;
    &:after {
        content: '';
        display: block;
        border-bottom: 1px solid #d9d9d9;
        transform: scaleY(.5);
    }
}

.m-list {
    position: relative;
    padding: 0;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        transform: scaleY(.5);
        background: #ccc;
    }
    .bd {
        padding: 10px 15px;
    }
    .u-ico-v {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: text-bottom;
        background: url('../assets/images/renzheng.svg') no-repeat 50% 50% transparent;
    }
    .u-ico-what {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: text-bottom;
        background: url('../assets/images/wenhao.svg') no-repeat 50% 50% transparent;
    }
    .u-ico-up {
        display: inline-block;
        width: 20px;
        height: 20px;
        transition: transform .3s;
        transform: rotate(180deg);
        vertical-align: text-bottom;
        background: url('../assets/images/jiantou2.svg') no-repeat 50% 50% transparent;
    }
    .u-ico-up.z-crt {
        transform: rotate(0deg);
    }
    .m-listfd {
        transition: transform .1s;
        height: 0;
        transform: translate3d(0, 0, 0) scaleY(0);
        text-align: center;
        background: #ccc;
    }
    .m-listfd.z-crt {
        height: 100%;
        transform: translate3d(0, 0, 0) scaleY(1);
    }
    .m-listfd-item {
        padding: 8px 0;
    }
}

.m-tip {
    margin-top: 20px;
    text-align: center;
}

.u-cellitem {
    font-size: 14px;
    color: #666;
}

.f-tar {
    text-align: right;
}

.f-fs14 {
    font-size: 14px;
}
</style>
