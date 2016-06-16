<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">逾期提醒</x-header>

    <search class="m-searchlist-search" placeholder='客户名称' cancel-text='取消'></search>

    <flexbox style="background:#efeff4;">
        <flexbox-item>
            <selector readonly class="m-tabsort" :class="{'z-crt':daySort}" value="0" :options="dayList" @click="dayChange"></selector>
        </flexbox-item>
        <flexbox-item>
            <selector class="m-tabsort" :class="{'z-crt':moneySort}" readonly value="0" :options="moneyList" @click="moneyChange"></selector>
        </flexbox-item>
        <flexbox-item>
            <selector class="m-tabsel" value="0" :options='originList' @on-change="tabChange"></selector>
        </flexbox-item>
    </flexbox>

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
    Flexbox,
    FlexboxItem,
    Selector,
    Scroller,
    Spinner,
} from 'vux/src/components';

export default {
    data() {
            return {
            	scrollHeight:'130px',
            	isLoad:true,
            	notData:false,
                daySort: false,
                moneySort: false,
                dayList: [{
                    key: '0',
                    value: '逾期天数'
                }],
                moneyList: [{
                    key: '0',
                    value: '未还金额'
                }],
                originList: [{
                    key: '0',
                    value: '全部来源'
                }, {
                    key: '0',
                    value: '小额授信'
                }, {
                    key: '0',
                    value: '应收款'
                }, {
                    key: '0',
                    value: '月结服务费'
                }, {
                    key: '4',
                    value: '保证金'
                }, ],
                overdueList:[],
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
            Flexbox,
            FlexboxItem,
            Selector,
            Scroller,
            Spinner,
        },
}
</script>
<style scoped>
.m-tabsort:after {
    content: '';
    transition: transform .3s;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(25px, -50%, 0);
    background: url('../assets/images/sort_down.png') no-repeat 50% 50% / auto 80% transparent;
}

.z-crt.m-tabsort:after {
    transform: translate3d(25px, -50%, 0) rotate(180deg);
}
</style>
<style lang="scss">
// @import ''
.m-tabsort .weui_cell_ft {
    color: #333;
}

.m-searchlist-search.vux-search-fixed {
    position: relative;
}

.weui_cell_select.m-tabsel {
    .weui_cell_bd {
        &:after {
            right: 50%;
            margin-right: -32px;
        }
    }
    .weui_select {
        display: block;
        width: 110px;
        margin: 0 auto;
        padding: 0 10px;
    }
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
}

.m-tip {
    margin-top: 20px;
    text-align: center;
}
</style>
