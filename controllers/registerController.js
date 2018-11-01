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
                var perfect = {}
                perfect.uPhone = ctx.request.body.uPhone;
                perfect.uName = ctx.request.body.uName;
                perfect.uEmail =ctx.request.body.uEmail;
                perfect.uId = ctx.request.body.uId;
                try {
                    userDAO.userperfect(perfect);
                    ctx.body = {"code": 200, "message": '完善信息成功'};
                }
                catch (err) {
                    ctx.body = {"code": 500, "message": '执行失败', data: []}
                }
    },
    updateIdInfo: async (ctx, next)=>{
        var info = {}
        info.uTrueName = ctx.request.body.uTrueName;
        info.uCardId = ctx.request.body.uCardId;
        info.uSex = ctx.request.body.uSex;
        info.uId = ctx.request.body.uId;
        try {
        userDAO.updateIdInfo(info);
        ctx.body = {"code": 200, "message": '完善信息成功'};
        }
        catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
        }
    },
    updatePhoto:async (ctx,next)=>{
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/Headuploadfile'    //设置文件存放路径  //
        form.multiples = true;  //设置上传多文件
        form.parse(ctx.req, function (err, fields, files) {
            console.log('456')
            console.log(files)
            console.log('123')
            //根据files.filename.name获取上传文件名，执行后续写入数据库的操作
            console.log(fields)
            if (files.uHeadPic) {
                // 获取传入的路径与名字
                let src = files.uHeadPic.path;
                console.log(src);
                let fileName = files.uHeadPic.name;
                console.log(fileName);
                // 获取源文件全路径
                let srcNew = path.join(__dirname, files.uHeadPic.path);
                console.log(srcNew);
                // 改成你想要的名字
                let destName = `${path.basename(fileName, path.extname(fileName))}${path.extname(fileName)}`;
                console.log(destName);
                let name = path.join(path.parse(srcNew).dir, destName);
                console.log(name);
                let stt = `http://localhost:3000/Headuploadfile/${destName}`;
                console.log(stt);
                fs.renameSync(srcNew, path.join(path.parse(srcNew).dir, destName));
                let photo = {};
                photo.uId=fields.uId,
                photo.uHeadPic=stt
                userDAO.updatePhoto(photo)
            }
            //根据fileds.mydata获取上传表单元素的数据，执行写入数据库的操作
            try{
                ctx.body = {"code":200,"message":"ok",data:[]}
            }catch (err) {
                ctx.body = {"code":500,"message":err.toString(),data:[]}
            }
        })
    },
    userlogin: async (ctx, next) => {
        let query = ctx.request.body;
        let user = {};
        const hash = crypto.createHash('md5');
        hash.update(query.uPwd)
        let upwd = hash.digest('hex');
        user.uPhone = query.uPhone;
        user.uPwd = upwd;
        try {
            //获取传回的手机号和密码
            let jsondata = await userDAO.userlogin(user.uPhone);
            console.log(jsondata);
            if (jsondata.length == 0) {
                ctx.body = {
                    code: 500,
                    message: '用户不存在'
                }
            } else if (jsondata[0].uPwd == user.uPwd) {
                ctx.body = {"code": 200, "message": "登录成功！", data: jsondata[0]}
                //用户登录成功，将信息保存在cookie中
                ctx.cookies.set('user', jsondata[0])

            } else {
                ctx.body = {"code": 403, "message": '用户不存在或密码错误', data: []}
            }
        }
        catch
            (err)
        {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
        // try {
        //     let uphone = ctx.request.body.uphone;
        //
        //     //密码加密
        //     const hash = crypto.createHash('md5');
        //     hash.update(ctx.request.body.upwd)
        //     let upwd = hash.digest('hex');
        //
        //     console.log(upwd);
        //     let login = await userDAO.userlogin();
        //     let result = false;
        //     let user = {}
        //     for (let i = 0;i < login.length;i++) {
        //         if (upwd == login[i].uPwd && uphone == login[i].uPhone) {
        //             result = true;
        //             ctx.body = {'code': 200, 'message': '登录成功', "data": result}
        //             ctx.cookies.set('user', jsondata[0])
        //             return;
        //         } else {
        //             ctx.body = {'code': 403, 'message': '登录失败', "data":result};
        //             result = false;
        //         }
        //     }
        // }catch (err) {
        //     ctx.body = {"code": 500, "message": '服务器错误', err}
        // }
        //用户登录
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



    updateuEmail: async (ctx, next)=> {
        var emailInfo = {}
        emailInfo.uEmail = ctx.request.body.uEmail;
        emailInfo.uId = ctx.request.body.uId;
        try {
        let jsonData = await  userDAO.updateuEmail(emailInfo);
            ctx.body = {"code": 200, "message": '完善信息成功',data:jsonData};
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '执行失败', data: []}
        }
    },
    updateuName: async (ctx, next)=> {
        var nameInfo = {}
        nameInfo.uName = ctx.request.body.uName;
        nameInfo.uId = ctx.request.body.uId;
        // try {
        let jsonData = await userDAO.updateuName(nameInfo);
        //     ctx.body = {"code": 200, "message": '完善信息成功',data:jsonData};
        // }
        // catch (err) {
        //     ctx.body = {"code": 500, "message": '执行失败', data: []}
        // }
        console.log(jsonData)
    },
    updateTureName: async (ctx, next)=> {
        var ture = {}
        ture.uTrueName = ctx.request.body.uTrueName;
        ture.uId = ctx.request.body.uId;
        try {
            let jsonData = await userDAO.updateTureName(ture);
            ctx.body = {"code": 200, "message": '完善信息成功',data:jsonData};
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '执行失败', data: []}
        }
    },
    updateuPoss: async (ctx, next)=> {
        var poss = {}
        poss.uPossPort = ctx.request.body.uPossPort;
        poss.uId = ctx.request.body.uId;
        try {
            let jsonData = await userDAO.updateuPoss(poss);
            ctx.body = {"code": 200, "message": '完善信息成功',data:jsonData};
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '执行失败', data: []}
        }
    },
    updateuIdcard: async (ctx, next)=> {
        var card = {}
        card.uCardId = ctx.request.body.uCardId;
        card.uId = ctx.request.body.uId;
        try {
            let jsonData = await userDAO.updateuIdcard(card);
            ctx.body = {"code": 200, "message": '完善信息成功',data:jsonData};
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '执行失败', data: []}
        }
    },
};













