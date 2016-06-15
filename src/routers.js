'use strict'

export default function (router) {
    router.map({
        '/': {
            name: 'loading',
            component: function (resolve) {
                require(['./views/loading.vue'], resolve);
            }
        },
        '/index': {
            name: 'index',
            component: function (resolve) {
                require(['./views/index.vue'], resolve);
            }
        },
        // 客户管理
        '/main': {
            name: 'main',
            component: function (resolve) {
                require(['./views/main.vue'], resolve);
            }
        },
        // 今日提醒
        '/remind-today': {
            name: 'remind-today',
            component: function (resolve) {
                require(['./views/remind-today.vue'], resolve);
            }
        },
        // 逾期提醒
        '/remind-overdue': {
            name: 'remind-overdue',
            component: function (resolve) {
                require(['./views/remind-overdue.vue'], resolve);
            }
        },
        // 任务列表
        '/task-list': {
            name: 'task-list',
            component: function (resolve) {
                require(['./views/task-list.vue'], resolve);
            }
        },
        // 新建任务
        '/task-add': {
            name: 'task-add',
            component: function (resolve) {
                require(['./views/task-add.vue'], resolve);
            }
        },
        // 任务详情
        '/task-detail': {
            name: 'task-detail',
            component: function (resolve) {
                require(['./views/task-detail.vue'], resolve);
            }
        },
        // 快速签到
        '/fast-sign': {
            name: 'fast-sign',
            component: function (resolve) {
                require(['./views/fast-sign.vue'], resolve);
            }
        },
    })
}
