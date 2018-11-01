const assessmentDAO = require('../model/assessmentDAO');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
module.exports = {
    addAssessment:async (ctx,next)=>{
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/assessmentImages';   //设置文件存放路径
        form.multiples = true;  //设置上传多文件
        form.keepExtensions = true;//保留扩展名
        form.parse(ctx.req, function (err, fields, files) {
                console.log('123')
                console.log(files)
                console.log('456')
                //根据files.filename.name获取上传文件名，执行后续写入数据库的操作
                console.log(fields)
            let assessment = {};
            assessment.aImages = ''
            var j = files.aImages.length
            if(j>0){
                for (var i = 0;i<j; i++){
                    let src = files.aImages[i].path;
                    let fileName = files.aImages[i].name;
                    // 获取源文件全路径
                    let srcNew = path.join(__dirname, files.aImages[i].path);
                    // 改成你想要的名字
                    let destName = `${path.basename(fileName, path.extname(fileName))}${path.extname(fileName)}`;
                    let stt = `http://localhost:3000/assessmentImages/${destName}`;
                    let name = path.join(path.parse(srcNew).dir, destName);
                    fs.renameSync(srcNew, path.join(path.parse(srcNew).dir, destName));
                    assessment.aImages =stt + ','
                }
            }
            else {
                let src = files.aImages.path;
                let fileName = files.aImages.name;
                // 获取源文件全路径
                let srcNew = path.join(__dirname, files.aImages.path);
                // 改成你想要的名字
                let destName = `${path.basename(fileName, path.extname(fileName))}${path.extname(fileName)}`;
                let stt = `http://localhost:3000/assessmentImages/${destName}`;
                let name = path.join(path.parse(srcNew).dir, destName);
                fs.renameSync(srcNew, path.join(path.parse(srcNew).dir, destName));
                assessment.aImages =stt + ','

            }

            assessment.aId= fields.aId;
            assessment.arrvialDate= fields.arrvialDate;
            assessment.aContent = fields.aContent;
            assessment.aDate = new Date();
            assessment.aScore =fields.aScore;
            assessment.uId = fields.uId
            assessment.oId = fields.oId;
            assessment.hId =fields.hId;
            // assessment.aImages = ctx.request.aImages;
            assessment.aCommend= fields.aCommend;
            assessmentDAO.addAssessment(assessment);
        // })
                if (err) {
                    ctx.body = '上传失败'
                }
        })

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