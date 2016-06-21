<template>
    <div>
        <div class="weui_mask_transition" :class="{'weui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="hideBd"></div>
        <div class="weui_actionsheet" :class="{'weui_actionsheet_toggle': show}">
            <div class="weui_actionsheet_menu">
                <!-- <cell title="任务编号"><span slot="value">1231231231</cell>
            	<cell title="业务主题"><span slot="value">日常拜访</cell>
                <datetime style="color:#333;" :value.sync="dpText" :min-year='minYear' :max-year="maxYear" title="执行时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
                <div class="weui_actionsheet_cell" @click="hideBd">提交</div> -->
                <slot></slot>
                <div class="vux-actionsheet-gap" v-if="hasCancel"></div>
                <div class="weui_actionsheet_cell vux-actionsheet-cancel" v-if="hasCancel" @click="hideBd">取消</div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
    props: {
        show:{
        	type:Boolean,
        	default:false,
        },
        hasCancel:{
        	type:Boolean,
        	default:false,
        }
    },
    methods: {
        hideBd(){
        	this.show = false;
        }
    },
}
</script>
