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

// 随机筛选数据
const types = ['日常拜访', '潜在客户']
const stats = ['待执行', '执行中', '已完成', '已取消'];
const signs = ['已签到', '']

// 用户列表数据
function userList() {
    return {
        title: faker.name.firstName() + faker.name.lastName(),
        tel: faker.phone.phoneNumber() + '',
        address: faker.address.state() + ' ' + faker.address.city() + ' ' + faker.address.streetName(),
        business: faker.name.firstName() + faker.name.lastName(),
    }
}

// 任务列表数据
function taskList() {
    return {
        num: faker.random.number({ max: 9999999999, min: 1000000000 }),
        name: faker.name.firstName() + faker.name.lastName() + '有限公司',
        type: types.random(),
        stat: stats.random(),
        sign: signs.random(),
    }
}
// 任务详情数据
function taskInfo() {
    return {
        userName: faker.name.firstName() + faker.name.lastName(),
        userTel: faker.phone.phoneNumberFormat(),
        userAddress: faker.address.country() + faker.address.state()+faker.address.city(),
        userPos: faker.address.country() + faker.address.state()+faker.address.city(),
        userDate: faker.date.recent(),
        userStat: stats.random(),
        userWho: faker.name.firstName() + faker.name.lastName(),

        taskNum: ''+faker.random.number({ max: 9999999999, min: 1000000000 }),
        taskType: types.random(),
        taskDate: faker.date.recent(),
        taskDec: faker.random.words(),
        taskSign: signs.random(),
        taskWho: faker.name.firstName() + faker.name.lastName(),

        taskTxt: faker.random.words(),
        taskImg: 'http://temp.im/100',
    }
}

module.exports = function () {
    let data = {
        // 快速签到
        'getdata': {
            id: 0,
            title: faker.name.firstName() + faker.name.lastName(),
            num: faker.random.number({ max: 9999999999, min: 1000000000 }),
            img: 'http://temp.im/100'
        },
        'userlist': eachFn(userList),
        // 任务管理
        'tasklist': eachFn(taskList),
        'taskinfo': taskInfo(),
    }
    return data
}
