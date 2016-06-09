'use strict'
const faker = require('faker/locale/zh_CN')

function createUserList(num = 10) {
    let arr = [],
        obj = {};
    for(let i = 0; i < num; i++) {
        obj = {
            title: faker.name.firstName() + faker.name.lastName(),
            tel: faker.phone.phoneNumber() + '',
            address: faker.address.state() + ' '+faker.address.city() +' '+ faker.address.streetName(),
            business: faker.name.firstName() + faker.name.lastName(),
        }
        arr.push(obj);
    }
    return arr;
}

module.exports = function () {
    let data = {
        'getdata': {
            id: 0,
            title: faker.name.firstName() + faker.name.lastName(),
            num: faker.random.number({ max: 9999999999, min: 1000000000 }),
            img: faker.image.image()
        },
        'userlist': createUserList(),
    }
    return data
}
