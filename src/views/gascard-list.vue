<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">油卡管理
        <div class="m-schbtn" slot="right" @click="showSearch = true">搜索</div>
    </x-header>

    <div class="g-userhd">
        <cell>
            <div class="icon" slot="icon">油卡：<span class="u-nums">{{nums}}</span> 个</div>
            <div class="f-fs14" v-link="{path:'/gascard-add'}">新增 +</div>
        </cell>
    </div>

    <scroller v-ref:scroller :height="scrollHeight" lock-x>
        <div class="g-scroller" v-show="!isLoad">
            <div class="m-glist" v-for="(index,items) in gascardList" @click="goDetail(index)">
                <cell :title="items.gascardNum + '_' + items.gascardState">{{items.gascardPlate}}</cell>
                <cell :title="items.gascardName">
                    {{items.gascardType}}
                </cell>
            </div>
        </div>
        <div class="m-tip" v-show="isLoad">
            <spinner></spinner>
        </div>
        <div class="m-tip" v-show="notData">暂无数据！</div>
    </scroller>

    <!-- 搜索 -->
    <actionsheet2 :show.sync="showSearch" has-cancel>
        <x-input title="客户名称" placeholder="可填"></x-input>
        <x-input title="车牌号码" placeholder="可填"></x-input>
        <x-input title="加油卡号" placeholder="可填"></x-input>
        <selector title="油卡状态" value="全部" :options="gascardType"></selector>
        <div class="weui_actionsheet_cell">搜索</div>
    </actionsheet2>
</template>

<script>
import {
    XHeader,
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    Selector,
    Scroller,
    Spinner,
    XInput,
} from 'vux/src/components';
import Actionsheet2 from '../components/actionsheet2/index.vue'

const today = new Date();
const minYear = today.getFullYear();
const maxYear = today.getFullYear() + 1;

export default {
    data() {
            return {
                // 首次载入
                scrollHeight: '392px',
                nums: 639,
                // 变更
                notData: false,
                isLoad: true,
                showSearch: false,
                // 数据
                gascardType: ['全部', '挂失', '申请解挂失', '申请换卡', '申请退卡', '正常', '禁用', '退卡'],
                gascardList: [],
            }
        },
        methods: {
            goDetail(i) {
                let id = this.gascardList[i].gascardId
                this.$router.go('/gascard-detail?id' + id)
            },
        },
        created() {
            this.scrollHeight = window.screen.height - 92 + 'px';
        },
        ready() {
            this.$http.get('/api/gascardlist').then(res => {
                if (!res.data.length) {
                    return this.notData = true;
                }
                this.gascardList = Object.assign({}, this.gascardList, res.data);
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
            Flexbox,
            FlexboxItem,
            Selector,
            Scroller,
            Spinner,
            XInput,
            Actionsheet2,
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
.m-glist{
	position:relative;
	background-color:#fff;
    &:after {
        content: '';
        display: block;
        border-bottom: 1px solid #d9d9d9;
        transform: scaleY(.5);
    }
}

.m-tip {
    margin-top: 20px;
    text-align: center;
}

.u-nums {
    color: #ec6f26;
}
</style>
