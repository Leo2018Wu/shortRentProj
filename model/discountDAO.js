const DAO = require('../model/DAO')
class DB {
    //用户打折
    userdiscount(discount) {
        console.log('第三步传数据')
        console.log(discount);
        return DAO('select * from discount where disWay = ?', [discount.disWay]);
    }
}
module.exports = new DB();