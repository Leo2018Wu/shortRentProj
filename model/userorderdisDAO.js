const DAO = require('../model/DAO')
class DB {
    //用户注册
    userregister(register) {
        return DAO('insert into user(uPhone,uInviteCode,uPwd,uName) VALUES(?,?,?,?)',
            [register.uPhone,register.uInviteCode,register.uPwd, register.uName]);
    }
    //用户登录
    userlogin(uPhone) {
        return DAO('select * from user where uPhone = ?',[uPhone]);
    }
    //获取所有的手机号
    getallphone(uPhone) {
        return DAO('select uPhone from user where uPhone = ?',[uPhone]);
    }
    //用户完善信息
    userperfect(perfect) {
        return DAO('update user set uName = ?,uLocation = ?,uEmail = ?,uHeadPic = ?,uTrueName = ?,uPossPort = ?,uBirth = ?,uRegisterTime = ?,uSex = ?,uCardId = ? where uPhone =?',
            [perfect.uName,perfect.uLocation, perfect.uEmail, perfect.uHeadPic,perfect.uTrueName,perfect.uPossPort,perfect.uBirth,perfect.uRegisterTime,perfect.uSex,perfect.uCardId,perfect.uPhone ]);
    //    用户性别无法更新，uSex
    }

}
module.exports = new DB();