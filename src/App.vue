<template>
    <!-- Text -->
    <div id="app" class="m-app">
        <img class="logo" src="./assets/logo.png">
        <p>
            Welcome to your Vue.js app!
        </p>
        <p>
            To get a better understanding of how this boilerplate works, check out
            <a href="http://vuejs-templates.github.io/webpack" target="_blank">its documentation</a>. It is also recommended to go through the docs for
            <a href="http://webpack.github.io/" target="_blank">Webpack</a> and
            <a href="http://vuejs.github.io/vue-loader/" target="_blank">vue-loader</a>. If you have any issues with the setup, please file an issue at this boilerplate's
            <a href="https://github.com/vuejs-templates/webpack" target="_blank">repository</a>.
        </p>
        <p>
            You may also want to checkout
            <a href="https://github.com/vuejs/vue-router/" target="_blank">vue-router</a> for routing and
            <a href="https://github.com/vuejs/vuex/" target="_blank">vuex</a> for state management.
        </p>
    </div>
    <!-- Demos -->
    <div id="demo" class="m-demo">
        <h1 class="m-h1">Demos</h1>
        <hello></hello>
        <v-model></v-model>
        <v-for></v-for>
        <v-click></v-click>
        <v-more></v-more>
    </div>
</template>

<script>
import Hello from './components/Hello';
import VModel from './components/VModel';
import VFor from './components/VFor';
import VClick from './components/VClick';
import VMore from './components/VMore';

export default {
    components: {
        Hello,
        VModel,
        VFor,
        VClick,
        VMore,
    },
};
</script>

<style lang="scss">
$colorBlue:#42b983;
html {
    min-height: 100%;
}

body {
    margin: 0;
    padding: 0;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    min-height: 100%;
    font-size: 14px;
    color: #555;
    // background: url('./assets/login.jpg') no-repeat 50% 0 transparent;
}

p {
    font-size: 14px;
}

.m-app {
    color: #2c3e50;
    max-width: 600px;
    margin: 0 auto;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
    a {
        color: #42b983;
        text-decoration: none;
    }
}

.logo {
    width: 100px;
    height: 100px
}

.m-demo {
    .m-h1 {
        font-size: 30px;
        color: #f00;
    }
    padding: 20px;
    margin-top: 20px;
    text-align: left;
}

.m-bd {
    margin-bottom: 40px;
    h1 {
        line-height: 1.5;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        font-weight: 700;
        color: $colorBlue;
    }
}
</style>
