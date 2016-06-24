<template>
	<div>
		<x-header :left-options="{showBack:false}">登录</x-header>
		<group>
			<x-input title="用户名" placeholder="请输入用户名" :show-clear="showClear" required :value.sync="userName"></x-input>
			<x-input title="密码" placeholder="请输入密码" :show-clear="showClear" required type="password" :value.sync="userPw"></x-input>
		</group>
		<div class="weui_btn_area">
			<x-button type="primary" @click="goLogin">登录</x-button>
		</div>

		<!-- 提示 -->
		<toast :show.sync="isEmpty" width="12em" type="warn">用户名与密码不可为空</toast>
		<toast :show.sync="isWarn" width="10em" type="warn">用户名或密码错误</toast>
		<loading :show="isYes"></loading>
	</div>
</template>

<script>
import {
	XHeader,
	Group,
	XInput,
	XButton,
	Toast,
	Loading
} from 'vux/src/components';

export default {
	data() {
			return {
				showClear: false,
				userName: '',
				userPw: '',
				isEmpty: false,
				isWarn: false,
				isYes: false,
			}
		},
		created() {
			// sessionStorage localStorage
			const loginId = localStorage.getItem('loginId') || '';
			const loginName = localStorage.getItem('loginName') || '';
			const loginEnter = localStorage.getItem('loginEnter') || false;
			if (!!loginId.length && loginEnter) {
				this.$route.router.go('/main')
			}
		},
		methods: {
			goLogin() {
				// 空判断
				if (!this.userName.length || !this.userPw.length) return this.isEmpty = true;
				// 请求响应数据再判断
				if (this.userName === '1') return this.isWarn = true;
				if (true) {
					this.isYes = true;
					localStorage.setItem('loginName', this.userName)
					localStorage.setItem('loginId', '1234')
					localStorage.setItem('loginEnter', true)
					this.$route.router.go('/main')
				}
			}
		},
		components: {
			XHeader,
			Group,
			XInput,
			XButton,
			Toast,
			Loading,
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
