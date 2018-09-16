const DAO = require('../model/DAO')
class DB{
    //用户注册
    userregister(register){
        console.log('用户注册第三步传数据')
        console.log(register);
        return DAO('insert into user(uPhone,uInviteCode,uId,uPwd,uName) VALUES(?,?,?,?,?)',
            [parseInt(register.uPhone),parseInt(register.uInviteCode),parseInt(register.uId),register.uPwd,register.uName]);
    }
    //用户登录
    userlogin(login){
        console.log('用户登录第三步传数据');
        console.log(login);
        return DAO('select uId,uPwd,uName,uPhone from user where uInviteCode= ？',
                    [parseInt(login.uInviteCode)]);
    }
   //用户完善信息
    userperfect(perfect) {
        console.log('用户完善信息第三步传数据');
        console.log(perfect);
            return DAO('insert into user(uId,uPwd,uName,uPhone,uLocation,uEmail,uHeadPic,uTrueName,uPossPort,uSex,uBirth,uRegisterTime,uCardId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
                 [parseInt(perfect.uId),perfect.uPwd,perfect.uName,parseInt(perfect.uPhone),perfect.uLocation,perfect.uEmail,perfect.uHeadPic,perfect.uTrueName,
                  perfect.uPossPort,perfect.uSex,perfect.uBirth,perfect.uRegisterTime,perfect.uCardId]);
        }
    //     return DAO('insert into user(uId,uPwd,uName,uPhone,uLocation,uEmail,uHeadPic,uTrueName,uPossPort,uSex,uBirth,uRegisterTime,uCardId) VALUES(1,2,3,4,5,6,7,8,9,0,0,0,0)',[]);
    // }

}
module.exports = new DB();