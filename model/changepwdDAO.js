const DAO = require('../model/DAO')
class DB {
    //用户更改密码
    idchangpwd(changpwd) {
        console.log(changpwd);
        // return DAO('update user set uPhone = ?,uPwd = ? where uId = ?', [changpwd.uPhone,changpwd.uPwd,changpwd.uId]);
        return DAO('update user set uPwd = ? where uId = ?', [changpwd.uPwd,changpwd.uId]);
    }
}
module.exports = new DB()