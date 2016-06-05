<template>
    <!-- 头部 -->
    <nav-head>Index Page
        <!-- <a href="#" slot="left">Close</a> -->
        <a href="#" slot="right">...</a>
    </nav-head>
    <!-- 轮播图 -->
    <swiper></swiper>
</template>

<script>
export default {
    data() {
            return {
                inputMsg: '请输入'
            }
        },
        components: {
            navHead: require('vux/src/components/x-header'),
            swiper: require('vux/src/components/swiper'),
        },
        compiled() {
            // 可更改navHead组件内props
            this.$children[0].leftOptions.backText = '';

            // 可更改swiper组件内props
            let swiper = this.$children[1];
            swiper.auto = true;
            swiper.list = [{
                url: '#1',
                img: 'http://temp.im/800x300/f60/ffffff',
                title: ''
            }, {
                url: '#2',
                img: 'http://temp.im/800x300/fc0/ffffff',
                title: ''
            }, {
                url: '#3',
                img: 'http://temp.im/800x300/f00/ff0000',
                title: ''
            }]
        }
}
</script>
