var diarysDAO = require('../model/diarysDAO')
var adminDAO = require('../model/adminDAO')
var formidable = require('formidable');
var fs =require('fs');
var path = require('path');
const crypto = require('crypto');
module.exports = {
    //推荐的日记
    getDiarys:async (ctx,next) => {
        try{
            let jsonData = await diarysDAO.getDiarys(ctx.params.recommend)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonData}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //房源对应的日记
    getHDiarys:async (ctx,next) => {
        try{
            let jsonData = await diarysDAO. getHDiarys(ctx.params.hId)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonData}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //查询用户所写日记
    getUDiarys:async (ctx,next) => {
        try{
            let jsonData = await diarysDAO. getUDiarys(ctx.params.uId)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonData}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //日记详情
    getDDiarys:async (ctx,next) => {
        try{
            let jsonData = await diarysDAO. getDDiarys(ctx.params.dId)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonData}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    addDiarys1:async (ctx,next) => {
        //1.收集数据
        // let jsonData = await adminDAO.getOneOrders(ctx.params.oId)
        // console.log(jsonData[0].hId)
        // console.log(jsonData[0].uId)
        // console.log(jsonData[0].arrvialDate)
        let diarys = { };

        diarys.dId = ctx.request.body.dId
        diarys.arrvialDate = ctx.request.body.arrvialDate
        diarys.dContent = ctx.request.body.dContent
        diarys.dDate = new Date()
        diarys.recommend = ctx.request.body.recommend
        diarys.uId = ctx.request.body.uId
        diarys.hId = ctx.request.body.hId
        diarys.dTitle = ctx.request.body.dTitle
        diarys.dThumbs= ctx.request.body.dThumbs
        diarys.dImages= ctx.request.body.dImages
        diarys.oId= ctx.request.body.oId
        console.log(diarys);
        try{
            //2.调用用户数据访问对象的添加方法
            let jsonDatas = await diarysDAO.addDiarys(diarys)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonDatas}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    deleteDiarys:async (ctx,next) => {
        //1.收集数据
        let id =ctx.params.dId ;
        try{
            //2.调用日记数据访问对象的删除方法
            await diarysDAO.deleteDiarys(id)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //根据日记编号显示日记评论
    getAssessments:async (ctx,next) => {
        try{
            let jsonData = await diarysDAO.getAssessments(ctx.params.dId)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonData}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    getUandAssessments:async (ctx,next) => {
        try{
            let jsonData = await diarysDAO.getUandAssessments(ctx.params.dId)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonData}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

    addAssessments:async (ctx,next) => {
        //1.收集数据
        let jsonData = await diarysDAO.getDDiarys(ctx.params.dId)
        let assessments = { };
        assessments.daId = ctx.request.body.daId
        assessments.daDate = new Date()
        assessments.daContent = ctx.request.body.daContent
        assessments.dId = jsonData[0].dId

        try{
            //2.调用用户数据访问对象的添加方法
            await diarysDAO.addAssessments(assessments)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:assessments}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

    deleteAssessments:async (ctx,next) => {
        //1.收集数据
        let id =ctx.params.daId
        try{
            //2.调用日记数据访问对象的删除方法
            await diarysDAO.deleteAssessments(id)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

    addDiarys: async (ctx, next) => {
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/diaryImages';   //设置文件存放路径
        form.multiples = true;  //设置上传多文件
        form.keepExtensions = true;//保留扩展名
        form.parse(ctx.req, function (err, fields, files) {
            console.log(files)
            console.log(files.dImages)
            console.log(typeof  files.dImages);
            //根据files.filename.name获取上传文件名，执行后续写入数据库的操作
            console.log(fields)
            // console.log(files.dImages)
            if (files.dImages==undefined ) {
                let diarys = {};
                diarys.dId = fields.dId
                diarys.arrvialDate = fields.arrvialDate
                diarys.dContent = fields.dContent
                diarys.dDate = new Date()
                diarys.recommend = fields.recommend
                diarys.uId = fields.uId
                diarys.hId = fields.hId
                diarys.dTitle = fields.dTitle
                // diarys.dImages = ''
                diarys.dThumbs = fields.dThumbs
                diarys.oId = fields.oId
                diarysDAO.addDiarys(diarys);


                // }
                try {
                    console.log(ok)
                    ctx.body = {"code": 200, "message": "ok", data: []}
                } catch (err) {
                    ctx.body = {"code": 500, "message": err.toString(), data: []}
                }
            }
            else  {
                var j = files.dImages.length
                console.log(j)
                if (j > 1) {
                    let diarys = {};
                    diarys.dImages = ''
                    for (var i = 0; i < j; i++) {
                        let src = files.dImages[i].path;
                        let fileName = files.dImages[i].name;
                        // 获取源文件全路径
                        let srcNew = path.join(__dirname, files.dImages[i].path);
                        // 改成你想要的名字
                        let destName = `${path.basename(fileName, path.extname(fileName))}${path.extname(fileName)}`;
                        let stt = `http://localhost:3000/diaryImages/${destName}`;
                        let name = path.join(path.parse(srcNew).dir, destName);
                        fs.renameSync(srcNew, path.join(path.parse(srcNew).dir, destName));
                        diarys.dImages = diarys.dImages + stt + ','
                        console.log( diarys.dImages)
                    }
                    diarys.dId = fields.dId
                    diarys.arrvialDate = fields.arrvialDate
                    diarys.dContent = fields.dContent
                    diarys.dDate = new Date()
                    diarys.recommend = fields.recommend
                    diarys.uId = fields.uId
                    diarys.hId = fields.hId
                    diarys.dTitle = fields.dTitle
                    diarys.dThumbs = fields.dThumbs
                    diarys.oId = fields.oId
                    diarysDAO.addDiarys(diarys);
                    // }
                    try {
                        ctx.body = {"code": 200, "message": "ok", data: []}
                    } catch (err) {
                        ctx.body = {"code": 500, "message": err.toString(), data: []}
                    }
                }
                else {
                    let diarys = {};
                    let src = files.dImages.path;
                    let fileName = files.dImages.name;
                    // 获取源文件全路径
                    let srcNew = path.join(__dirname, files.dImages.path);
                    // 改成你想要的名字
                    let destName = `${path.basename(fileName, path.extname(fileName))}${path.extname(fileName)}`;
                    let stt = `http://localhost:3000/diaryImages/${destName}`;
                    let name = path.join(path.parse(srcNew).dir, destName);
                    fs.renameSync(srcNew, path.join(path.parse(srcNew).dir, destName));
                    diarys.dImages = stt + ','
                    diarys.dId = fields.dId
                    diarys.arrvialDate = fields.arrvialDate
                    diarys.dContent = fields.dContent
                    diarys.dDate = new Date()
                    diarys.recommend = fields.recommend
                    diarys.uId = fields.uId
                    diarys.hId = fields.hId
                    diarys.dTitle = fields.dTitle
                    // diarys.dImages = stt
                    diarys.dThumbs = fields.dThumbs
                    diarys.oId = fields.oId
                    diarysDAO.addDiarys(diarys);
                    // }
                    try {
                        ctx.body = {"code": 200, "message": "ok", data: []}
                    } catch (err) {
                        ctx.body = {"code": 500, "message": err.toString(), data: []}
                    }

                }
            }

        })
    },

}
