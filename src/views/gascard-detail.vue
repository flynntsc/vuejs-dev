<template>
    <x-header :left-options="{showBack:true,backText:'返回'}">任务详情</x-header>

    <group title="客户信息">
        <cell :value="taskInfo.userName">
            <div slot="icon" style="styleCellHd">客户名称</div>
        </cell>
        <cell title="客户手机" :value="taskInfo.userTel"></cell>
        <cell :value="taskInfo.userAddress">
            <div slot="icon" style="styleCellHd">客户地址</div>
        </cell>
        <cell :value="taskInfo.userPos">
            <div slot="icon" style="styleCellHd">客户位置</div>
        </cell>
        <cell title="签到时间" :value="taskInfo.userDate"></cell>
        <cell title="客户状态" :value="taskInfo.userStat"></cell>
        <cell title="业务代表" :value="taskInfo.userWho"></cell>
    </group>

    <group title="任务信息">
        <cell title="任务号" :value="taskInfo.taskNum"></cell>
        <cell title="任务主题" :value="taskInfo.taskType"></cell>
        <cell title="计划时间" :value="taskInfo.taskDate"></cell>
        <cell :value="taskInfo.taskDec">
            <div slot="icon" style="styleCellHd">任务描述</div>
        </cell>
        <cell title="任务状态" :value="taskInfo.taskSign"></cell>
        <cell title="创建人" :value="taskInfo.taskWho"></cell>
    </group>

    <group title="执行情况">
        <cell :value="taskInfo.taskTxt">
            <div slot="icon" style="styleCellHd">情况描述</div>
        </cell>
        <cell>
            <div slot="icon" style="white-space: nowrap;">现场图片</div>
            <img slot="value" :src="taskInfo.taskImg" alt="" style="width:100px;height:100px;">
        </cell>
    </group>
</template>

<script>
import {
    XHeader,
    Group,
    Cell,
} from 'vux/src/components';

export default {
    data() {
            return {
            	styleCellHd:{
            		whiteSpace: 'nowrap',
            		marginRight:'5px',
            	},
                taskInfo: {
                    userName: '',
                    userTel: '',
                    userAddress: '',
                    userPos: '',
                    userDate: '',
                    userStat: '',
                    userWho: '',
                    taskNum: '',
                    taskType: '',
                    taskDate: '',
                    taskDec: '',
                    taskSign: '',
                    taskWho: '',
                    taskDec: '',
                    taskTxt: '',
                    taskImg: '',
                }
            }
        },
        ready() {
            this.$http.get('/api/taskinfo').then(res => {
                this.taskInfo = Object.assign({},this.taskInfo, res.data)
            }, error => console.error(err))
        },
        components: {
            XHeader,
            Group,
            Cell,
        },
}
</script>
<style>
.g-body {
    background-color: #fbf9fe;
}
</style>
