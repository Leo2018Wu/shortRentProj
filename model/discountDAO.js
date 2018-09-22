const DAO = require('../model/DAO')
class DB {
    //用户打折
    userdiscount(disId) {
        return DAO('select * from discount where disId = ?', [disId]);
    }
}
module.exports = new DB();