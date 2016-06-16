<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">今日到期提醒</x-header>

    <search class="m-searchlist-search" placeholder='客户名称' cancel-text='取消'></search>

    <tab>
        <tab-item :selected="mytab === '今日'" @click="mytab = '今日'">今日</tab-item>
        <tab-item :selected="mytab === '近三日'" @click="mytab = '近三日'">近三日</tab-item>
        <tab-item :selected="mytab === '近七日'" @click="mytab = '近七日'">近七日</tab-item>
    </tab>

    <scroller v-ref:scroller :height="scrollHeight" lock-x>
        <div class="g-scroller" v-show="!isLoad">
            <div class="m-list" v-for="list in overdueList">
                <flexbox>
                    <flexbox-item style="font-weight:bold;">{{list.company}}</flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>认证类型：{{list.type}}</flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>未还金额：{{list.price}} 元</flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>逾期天数：{{list.day}} 天</flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="m-tip" v-show="isLoad">
            <spinner></spinner>
        </div>
        <div class="m-tip" v-show="notData">暂无数据！</div>
    </scroller>
</template>

<script>
import {
    XHeader,
    Search,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    Selector,
    Scroller,
    Spinner,
} from 'vux/src/components';

export default {
    data() {
            return {
                mytab: '今日',
                scrollHeight: '436px',
                isLoad: true,
                overdueList: [],
            }
        },
        methods: {
            tabChange() {
                console.log('tabChange');
            },
            dayChange() {
                this.daySort = !this.daySort;
            },
            moneyChange() {
                this.moneySort = !this.moneySort;
            },
        },
        compiled() {
            this.scrollHeight = window.screen.height - 132 + 'px';
        },
        ready() {
            this.$http.get('/api/overdue').then(res => {
                if (res.data.length) {
                    this.overdueList = res.data
                    this.isLoad = false;

                    this.$nextTick(() => {
                        this.$refs.scroller.reset()
                    })
                } else {
                    this.notData = true;
                }
            }, err => console.error(err))
        },

        components: {
            XHeader,
            Search,
            Tab,
            TabItem,
            Flexbox,
            FlexboxItem,
            Selector,
            Scroller,
            Spinner,
        },
}
</script>
<style lang="scss">
.m-searchlist-search.vux-search-fixed {
    position: relative;
}

.m-list {
    position: relative;
    padding: 10px 15px;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        transform: scaley(.5);
        background: #ccc;
    }
    .flex-item-1 {
        text-align: right;
        color: #45b3ee;
    }
}

.m-tip {
    margin-top: 20px;
    text-align: center;
}
</style>
