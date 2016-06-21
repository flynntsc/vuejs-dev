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
const types = ['日常拜访', '潜在客户'];
const authentication = ['个人','营运车主','乘用车','物流企业','供应商'];
const stats = ['待执行', '执行中', '已完成', '已取消'];
const signs = ['已签到', '']
const iboolean = [true, false]

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
        userName: myName(),
        userType: authentication.random(),
        userPos: myAddress(),
        userWho: myName(),
        linkman: myName(),
        linkTel: myTel(),
        linkAddress: myAddress(),

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
