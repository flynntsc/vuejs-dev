<template>
    <div>
        <x-header :left-options="{showBack:true,backText:'返回'}">油卡业务</x-header>

        <group>
            <divider class="m-divider">油卡管理</divider>
            <flexbox :gutter="0">
                <flexbox-item class="m-lcard">
                    <cell link="/gascard-list" :inline-desc="listText">
                        <span slot="after-title">油卡列表</span>
                    </cell>
                </flexbox-item>
                <flexbox-item class="m-lcard">
                    <cell link="/gascard-add" :inline-desc="addText">
                        <span slot="after-title">新增油卡</span>
                    </cell>
                </flexbox-item>
            </flexbox>
        </group>
    </div>
</template>

<script>
import {
    XHeader,
    Group,
    Divider,
    Flexbox,
    FlexboxItem,
    Cell,
} from 'vux/src/components';

export default {
    data() {
            return {
                listText: '共有0张油卡',
                addText: '方便快捷',
            }
        },
        ready() {
            // ajax获取
            this.listText = '共有12312张油卡'
        },
        methods: {},
        components: {
            XHeader,
            Group,
            Divider,
            Flexbox,
            FlexboxItem,
            Cell,
        }
}
</script>
<style>
html {
    height: 100%;
}

.g-body {
    background-color: #fbf9fe;
}
</style>
<style lang="scss" scoped>
.m-divider {
    padding: 15px 0;
}

.m-lcard {
    position: relative;
    & + .m-lcard:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 1px;
        height: 100%;
        border-left: 1px solid #d9d9d9;
        transform: scaleX(.5);
    }
}
</style>
