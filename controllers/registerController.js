var userDAO = require('../model/userorderdisDAO')
module.exports = {
    userregister: async (query, next) => {
        let register = {};
        register.uPhone = query.uphone;
        register.uInviteCode = query.uinvitecode;
        register.uId = query.uid;
        register.uPwd = query.upwd;
        register.uName = query.uname;
        console.log('第二步传数据')
        console.log(register);
        try {
            await userDAO.userregister(register)
            ctx.body = ('注册成功');
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    userlogin: async (query, next) => {
        let login = {};
        login.uId = query.uid;
        login.uPwd = query.upwd;
        login.uName = query.uname;
        login.uPhone = query.uphone;
        login.uInviteCode = query.uinvitecode;
        console.log('第二步传数据')
        console.log(login);
        try {
            await userDAO.userlogin(login);
            ctx.body = ('登录成功');
            console.log('用户登录成功')
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    userperfect: async (query,next) => {
        let perfect = {};
        perfect.uId = query.uid;
        perfect.uPhone = query.uphone;
        perfect.uPwd = query.upwd;
        perfect.uName = query.uname;
        perfect.uHeadPic = query.uheadPic;
        perfect.uEmail = query.uemail;
        perfect.uTrueName = query.utrueName;
        perfect.uCardId = query.ucardid;
        perfect.uPossPort = query.upossPort;
        perfect.uSex = query.usex;
        perfect.uBirth = query.ubirth;
        perfect.uLocation = query.ulocation;
        perfect.uRegisterTime = query.uregistertime;
        //无邀请码，这里通过用户名id来匹配用户，进而改信息
        console.log('第二步传数据');
        console.log(perfect);
        try {
            await userDAO.userperfect(perfect);
            ctx.body = ('用户信息完善成功');
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    }
}












