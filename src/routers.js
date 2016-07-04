'use strict'

export default function (router) {
	router.map({
		// 截取判断再跳转页面
		'/': {
			name: 'home',
			component: function (resolve) {
				require(['./views/loading.vue'], resolve);
			}
		},
		// 加载
		'/loading': {
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
		// 登录页面
		'/login': {
			name: 'login',
			component: function (resolve) {
				require(['./views/login.vue'], resolve);
			}
		},
		// 客户、信息、任务
		// 客户管理
		'/main': {
			name: 'main',
			component: function (resolve) {
				require(['./views/main.vue'], resolve);
			}
		},
		// 客户列表
		'/user-list': {
			name: 'user-list',
			component: function (resolve) {
				require(['./views/user-list.vue'], resolve);
			}
		},
		// 客户详情
		'/user-detail': {
			name: 'user-detail',
			component: function (resolve) {
				require(['./views/user-detail.vue'], resolve);
			}
		},
		// 客户编辑
		'/user-edit': {
			name: 'user-edit',
			component: function (resolve) {
				require(['./views/user-edit.vue'], resolve);
			}
		},
		// 客户新增
		'/user-add': {
			name: 'user-add',
			component: function (resolve) {
				require(['./views/user-add.vue'], resolve);
			}
		},
		// 客户新增步骤2
		'/user-add-step': {
			name: 'user-add-step',
			component: function (resolve) {
				require(['./views/user-add-step.vue'], resolve);
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
		// 业务协作...
		// 油卡业务
		'/gascard': {
			name: 'gascard',
			component: function (resolve) {
				require(['./views/gascard.vue'], resolve);
			}
		},
		// 油卡管理/列表
		'/gascard-list': {
			name: 'gascard-list',
			component: function (resolve) {
				require(['./views/gascard-list.vue'], resolve);
			}
		},
		// 油卡详情
		'/gascard-detail': {
			name: 'gascard-detail',
			component: function (resolve) {
				require(['./views/gascard-detail.vue'], resolve);
			}
		},
		// 油卡新增
		'/gascard-add': {
			name: 'gascard-add',
			component: function (resolve) {
				require(['./views/gascard-add.vue'], resolve);
			}
		},
		// 小额授信
		'/mincredit': {
			name: 'mincredit',
			component: function (resolve) {
				require(['./views/mincredit.vue'], resolve);
			}
		},
		// 油卡工本费账单
		'/gascard-bill': {
			name: 'gascard-bill',
			component: function (resolve) {
				require(['./views/gascard-bill.vue'], resolve);
			}
		},
	})
}
