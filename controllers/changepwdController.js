var changepwdDAO = require('../model/changepwdDAO');
module.exports = {
    userchangpwd : async (query,next)=>{
        let changpwd = {};
        changpwd.uPhone = query.uphone;
        changpwd.uPwd= query.upwd;
        changpwd.uId =query.uid;
        //用户更改密码通过id匹配到指定的用户
        console.log('第二步传数据')
        console.log(changpwd);
        try {
            await changepwdDAO.userchangepwd(changpwd)
            ctx.body = ('密码更改成功');
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    }


}