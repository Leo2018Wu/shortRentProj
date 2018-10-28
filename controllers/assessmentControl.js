const assessmentDAO = require('../model/assessmentDAO');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
module.exports = {
    addAssessment:async (ctx,next)=>{
        // var form = new formidable.IncomingForm();
        // form.parse(ctx.req,async function (err,fields,files) {
        //     console.log(files)
        //     var src = files.aImages.path;
        //     var des = path.join(__dirname,'../','public/uploadfile',path.basename(src)+'.jpg');
        //     fs.copyFile(src,des,function () {
        //         console.log('文件复制成功！');
        //     })
            // let jsondata = await assessmentDAO.getOneOrder(ctx.params.oId);
            // console.log(ctx.params.oId);
            // console.log(jsondata[0].oId);
            // console.log(jsondata[0].arrvialDate);
            // console.log(jsondata[0].uId);
            // console.log(jsondata[0].hId);
            //1,收集数据(可能存在问题)
            let assessment = { };
            assessment.aId= ctx.request.body.aId;
            assessment.arrvialDate= ctx.request.body.arrvialDate;
            assessment.aContent = ctx.request.body.aContent;
            assessment.aDate = new Date();
            assessment.aScore =ctx.request.body.aScore;
            assessment.uId = ctx.request.body.uId
            assessment.oId = ctx.request.body.oId;
            assessment.hId =ctx.request.body.hId;
            assessment.aImages = ctx.request.aImages;
            assessment.aCommend= ctx.request.body.aCommend;
            await assessmentDAO.addAssessment(assessment);
        // })
        try{
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    delAssessment:async (ctx,next)=>{
        //1，收集数据
        try{
            let jsondata = await assessmentDAO.delAssessment(ctx.params.aId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }
};