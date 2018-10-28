const userDAO = require('../model/userorderdisDAO');
var formidable = require('formidable');
var fs =require('fs');
var path = require('path');
const crypto = require('crypto');
module.exports = {
    userregister: async (ctx,next) => {
        let query = ctx.request.body;
        //密码加密
        const hash = crypto.createHash('md5');
        hash.update(ctx.request.body.upwd)
        let upwd = hash.digest('hex');

        let register = {};
        register.uPhone = query.uphone;
        register.uInviteCode = query.uinvitecode;
        register.uPwd = upwd;
        register.uName = query.uname;
        try {
            await userDAO.userregister(register);
            ctx.body = {'code': 200, 'message': 'ok', data: register};
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '执行失败', data: []}
        }
    },
    userperfect: async (ctx, next)=>{
        var form = new formidable.IncomingForm();
        form.parse(ctx.req, function (err, fields, files) {
            var src = files.uheadPic.path;
            var des = path.join(__dirname, '../', 'public/uploadfile', path.basename(src) + '.jpg');
            fs.copyFile(src, des, function () {
                console.log('文件复制成功');
                var perfect = {}
                perfect.uName = fields.uname;
                perfect.uHeadPic =des;
                perfect.uEmail = fields.uemail;
                perfect.uTrueName = fields.utrueName;
                perfect.uCardId = fields.ucardid;
                perfect.uPossPort = fields.upossPort;
                perfect.uSex = fields.usex;
                perfect.uBirth = fields.ubirth;
                perfect.uLocation = fields.ulocation;
                perfect.uRegisterTime = fields.uregistertime;
                perfect.uPhone = fields.uphone;
                // //无邀请码，这里通过用户名id来匹配用户，进而改信息
                console.log(perfect);
                try {
                    userDAO.userperfect(perfect);
                    ctx.body = {"code": 200, "message": '完善信息成功'};
                }
                catch (err) {
                    ctx.body = {"code": 500, "message": '执行失败', data: []}
                }
            });
        })
        ctx.body = {"code": 200, "message": '完善信息成功'}
    },
    userlogin: async (ctx, next) => {
        try {
            let uphone = ctx.request.body.uphone;

            //密码加密
            const hash = crypto.createHash('md5');
            hash.update(ctx.request.body.upwd)
            let upwd = hash.digest('hex');

            console.log(upwd);
            let login = await userDAO.userlogin();
            let result = false;
            for (let i = 0;i < login.length;i++) {
                if (upwd == login[i].uPwd && uphone == login[i].uPhone) {
                    result = true;
                    ctx.body = {'code': 200, 'message': '登录成功', "data": result}
                    return;
                } else {
                    ctx.body = {'code': 200, 'message': '登录失败', "data":result};
                    result = false;
                }
            }
        }catch (err) {
            ctx.body = {"code": 500, "message": '服务器错误', err}
        }
    },
    //查询指定用户信息
    getUserInfo: async (ctx, next) => {
        try{
            let jsonData = await userDAO.getUserInfo(ctx.params.uId)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonData}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
};












