const DAO = require('../model/DAO')
class DB {
    //用户注册
    userregister(register) {
        return DAO('insert into user(uPhone,uInviteCode,uId,uPwd,uName) VALUES(?,?,?,?,?)',
            [register.uPhone,register.uInviteCode,register.uId, register.uPwd, register.uName]);
    }
    //用户登录
    userlogin() {
        return DAO('select uPwd,uPhone from user',[]);
    }

    //用户完善信息
    userperfect(perfect) {
        return DAO('update user set uName = ?,uLocation = ?,uEmail = ?,uHeadPic = ?,uTrueName = ?,uPossPort = ?,uBirth = ?,uRegisterTime = ?,uSex = ?,uCardId = ? where uPhone =?',
            [perfect.uName,perfect.uLocation, perfect.uEmail, perfect.uHeadPic,perfect.uTrueName,perfect.uPossPort,perfect.uBirth,perfect.uRegisterTime,perfect.uSex,perfect.uCardId,perfect.uPhone ]);
    //    用户性别无法更新，uSex
    }
    //查询指定用户信息
    getUserInfo(id){
        return DAO('SELECT * FROM `user` WHERE uId = ? ',[id]);
    }




}
module.exports = new DB();