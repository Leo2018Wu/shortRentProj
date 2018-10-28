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

        //用户完善基本信息
    userperfect(perfect) {
        return DAO('update `user` set uName = ?,uPhone =?,uEmail =? where uId =?',
            [perfect.uName,perfect.uPhone,perfect.uEmail,perfect.uId]);
    }
    //获取所有的手机号
    getallphone(uPhone) {
        return DAO('select uPhone from user where uPhone = ?',[uPhone]);
    }
    //用户完善身份信息
    updateIdInfo(info){
        return DAO('update `user` set uTrueName = ?,uCardId = ?,uSex = ? where uId = ?',
            [info.uTrueName,info.uCardId,info.uSex,info.uId])
    }
    // //用户修改密码
    // updatePwd(pwd){
    //     return DAO('update `user` set uPwd = ?,where uId = ? ',
    //         [pwd.uPwd,pwd.uId]);
    // }
    //用户上传头像
    updatePhoto(photo){
        return DAO('update `user` set uHeadPic = ? where uId = ? ',
            [photo.uHeadPic,photo.uId]);
    }

    //查询指定用户信息
    getUserInfo(id){
        return DAO('SELECT * FROM `user` WHERE uId = ? ',[id]);
    }




}
module.exports = new DB();