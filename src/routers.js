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
        // 快速签到
        '/fast-sign': {
            name: 'fast-sign',
            component: function (resolve) {
                require(['./views/fast-sign.vue'], resolve);
            }
        },
        // 任务列表
        '/task-list': {
            name: 'task-list',
            component: function (resolve) {
                require(['./views/task-list.vue'], resolve);
            }
        },
    })
}
