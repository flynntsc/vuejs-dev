'use strict'
const faker = require('faker/locale/zh_CN')

// 生成多个数据
function eachFn(fn, num = 20) {
    let arr = [],
        obj = {};
    for(let i = 0; i < num; i++) {
        arr.push(fn.call(this));
    }
    return arr;
}

// 数组随机选一个
Array.prototype.random = function () {
    return this[Math.random() * this.length | 0]
};

// 常用数据
const myName = () => faker.name.findName();
const myTel = () => faker.phone.phoneNumber();
const myNum = () => faker.random.number({ max: 9999999999, min: 1000000000 });
const myNum2 = () => faker.random.number({ max: 9999, min: 0 });
const myDay = () => faker.random.number({ max: 99, min: 0 });
const myArea = ()=> {
	var arr = [];
	arr.push(faker.address.state())
	arr.push(faker.address.cityPrefix() + faker.address.citySuffix())
	arr.push(faker.address.city())
	return arr;
};
const myArea2 = ()=> {
	var arr = [];
	arr.push(faker.address.state())
	arr.push(faker.address.city())
	return arr;
};
const myAddress = () => faker.address.state() + ' ' + faker.address.city() + ' ' + faker.address.streetName();
const myCompany = () => faker.name.firstName() + faker.name.lastName() + '有限公司';
const myWords = () => faker.random.words();
const myImg = (num = 100) => 'http://temp.im/' + num;
const myDate = () => {
    let now = Date.now();
    now += Math.random() * 10000000 | 0;
    now = new Date(now);
    return now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay();
}

// 随机筛选数据
const rank = ['企业','个人'];
const types = ['日常拜访', '潜在客户'];
const authentication = ['个人','营运车主','乘用车','物流企业','供应商'];
const motorCat = ['综合物流'];
const favorable = ['特惠积分','月结积分（柴油）','月结积分（汽油）','月结积分（柴汽油）','月结']
const stats = ['待执行', '执行中', '已完成', '已取消'];
const signs = ['已签到', '']
const iBoolean = [true, false]
const isNeed = ['需要','不需要']

// let i = 0;

// 用户列表数据
function userList() {
    return {
        title: myName(),
        tel: myTel(),
        address: myAddress(),
        business: myName(),
        job: myName(),
        isv: faker.random.boolean(),
        userid: myNum2(),
        taskid: myNum(),
    }
}
// 用户详情数据
function userInfo() {
    return {
    	userRank: rank.random(), // 客户类型
        userName: myName(), // 客户名称
        userType: authentication.random(), // 认证类型
        userPos: myArea2(), // 业务区域 - 省市
        userWho: myName(), // 业务代表
        userTel: myTel(), // 手机号码
        isSms: isNeed.random(), // 是否接收短信
        motorCat: motorCat.random(), // 车队分类
        favorable: favorable.random(), // 优惠方式


        linkman: myName(), // 联系人
        linkTel: myTel(), // 联系电话
        linkArea: myArea(), // 联系地址 - 省市县
        linkAddress: myAddress(), // 详细地址

        fortuneSum: myNum2(),
        fortuneBasic: myNum2(),
        fortuneHlx: myNum2(),
        fortuneJifen: myNum2(),

        creditSum: myNum2(),
        creditSuable: myNum2(),
        creditRepay: myNum2(),
        creditFrost: myNum2(),

        overdueSum: myNum2(),
        overdueSmall: myNum2(),
        overdueGet: myNum2(),
    }
}

// 任务列表数据
function taskList() {
    return {
        num: myNum(),
        name: myCompany(),
        type: types.random(),
        stat: stats.random(),
        sign: signs.random(),
    }
}
// 任务详情数据
function taskInfo() {
    return {
        userName: myName(),
        userTel: myTel(),
        userAddress: myAddress(),
        userPos: myAddress(),
        userDate: myDate(),
        userStat: stats.random(),
        userWho: myName(),

        taskNum: myNum(),
        taskType: types.random(),
        taskDate: myDate(),
        taskDec: myWords(),
        taskSign: signs.random(),
        taskWho: myName(),

        taskTxt: myWords(),
        taskImg: myImg(),
    }
}
// 逾期提醒数据
function overdue() {
    return {
        company: myCompany(),
        type: myName(),
        price: myNum2(),
        day: myDay(),
    }
}

module.exports = function () {
    let data = {
        // 快速签到
        'getdata': {
            id: 0,
            title: myName(),
            num: myNum(),
            img: myImg(),
        },
        'userlist': eachFn(userList),
        // 用户详情
        'userinfo': userInfo(),
        // 任务管理
        'tasklist': eachFn(taskList),
        'taskinfo': taskInfo(),
        'overdue': eachFn(overdue),
    }
    return data
}
