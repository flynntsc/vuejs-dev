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
        '/main': {
            name: 'main',
            component: function (resolve) {
                require(['./views/main.vue'], resolve);
            }
        },
        '/fast_sign': {
            name: 'fast_sign',
            component: function (resolve) {
                require(['./views/fast_sign.vue'], resolve);
            }
        },
    })
}
