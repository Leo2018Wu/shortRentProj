var changepwdDAO = require('../model/changepwdDAO');
const crypto = require('crypto');
module.exports = {
    idchangpwd : async (ctx,next)=>{
        let query =ctx.request.body;
        //密码加密
        const hash = crypto.createHash('md5');
        hash.update(ctx.request.body.upwd)
        let upwd = hash.digest('hex');
        console.log(upwd);

        let changpwd = {};
        // changpwd.uPhone = query.uphone;
        changpwd.uPwd= upwd;
        changpwd.uId =query.uid;
        //用户更改密码通过id匹配到指定的用户
        try {
            await changepwdDAO.idchangpwd(changpwd)
            ctx.body = {"code": 200, "message":'ok',data:changpwd};
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '更改失败', data: []}
        }
    },
    userchangpwd : async (ctx,next)=>{
        let query =ctx.request.body;
        //密码加密
        const hash = crypto.createHash('md5');
        hash.update(ctx.request.body.upwd)
        let upwd = hash.digest('hex');
        console.log(upwd);

        let changpwd = {};
        changpwd.uPhone = query.uphone;
        changpwd.uPwd= upwd;
        changpwd.uId =query.uid;
        //用户更改密码通过id匹配到指定的用户
        try {
            await changepwdDAO.userchangepwd(changpwd)
            ctx.body = {"code": 200, "message":'ok',data:changpwd};
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '更改失败', data: []}
        }
    }



}