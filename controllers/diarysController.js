var diarysDAO = require('../model/diarysDAO')
var adminDAO = require('../model/adminDAO')
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
    addDiarys:async (ctx,next) => {
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

    /*


    updateCompany: async (ctx, next) => {

    var form = new formidable.IncomingForm();
form.uploadDir = '../public/images';   //设置文件存放路径
form.multiples = true;  //设置上传多文件
form.keepExtensions = true;//保留扩展名
var iMages = "";
var src = "";
var fileDes = "";//文件添加时间戳
form.parse(ctx.req, async function (err, fields, files) {
    console.log('123')
    console.log(files)
    console.log('456')
    console.log(files)
    //根据files.filename.name获取上传文件名，执行后续写入数据库的操作
    console.log(fields)
    //根据fileds.mydata获取上传表单元素的数据，执行写入数据库的操作
    licenseImage = files.licenseImage.name;
    clogo = files.clogo.name;
    console.log(licenseImage);
    console.log(clogo);
    console.log(files.licenseImage.path);
    src = path.join(__dirname,files.licenseImage.path);
    console.log('src路径'+src);
    src1 = path.join(__dirname,files.clogo.path);
    console.log("src1 : " + src1);
    fileDes = path.basename(licenseImage, path.extname(licenseImage)) + moment(new Date()).format("YYYYMMDDHHMMSS") + path.extname(licenseImage);
    fileDes1 = path.basename( clogo, path.extname( clogo)) + moment(new Date()).format("YYYYMMDDHHMMSS") + path.extname(clogo);
    console.log("src : " + src);
    console.log("src1 : " + src1);
    console.log("dir : " + path.join(path.parse(src).dir))
    console.log("fileDes" + fileDes)
    fs.rename(src, path.join(path.parse(src).dir, fileDes));//重命名
    fs.rename(src1, path.join(path.parse(src1).dir, fileDes1));
    let str = `http://localhost:3000/images/${fileDes}`;
    let str1 = `http://localhost:3000/images/${fileDes1}`;
    let company = {}
    company.licenseImage = str;
    company.clogo = str1;
    company.licenseId = fields.licenseId;
    company.chineseName =fields.chineseName;
    company.englishName =fields.englishName;
    company.companyAddress =fields.companyAddress;
    company.industy =fields.industy;
    company.classify =fields.classify;
    company.cIntroduce =fields.cIntroduce;
    company.principalName =fields.principalName;
    company. principalPhone =fields. principalPhone;
    company.principalEmail =fields.principalEmail;
    console.log("str:" + str);
    console.log("str:" + str1);
    console.log(fields);
    console.log("licenseId:" + fields.licenseId);
    try {
        await companyDAO.updateCompany(company);
        ctx.body = {"code": 200, "message": "ok", data:str };
        console.log('data:'+data);
    } catch (e) {
        ctx.body = {"code": 500, "message": "err" + e.message, data: []};
    }
    // //根据fileds.mydata获取上传表单元素的数据，执行写入数据库的操作
})
},*/







}
