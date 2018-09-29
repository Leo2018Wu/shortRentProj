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
        let jsonData = await adminDAO.getOneOrders(ctx.params.oId)
        console.log(jsonData[0].hId)
        console.log(jsonData[0].uId)
        console.log(jsonData[0].arrvialDate)
        let diarys = { };
        diarys.dId = ctx.request.body.dId
        diarys.arrvialDate = jsonData[0].arrvialDate
        diarys.dContent = ctx.request.body.dContent
        diarys.dDate = new Date()
        diarys.recommend = ctx.request.body.recommend
        diarys.uId = jsonData[0].uId
        diarys.hId = jsonData[0].hId
        diarys.dTitle = ctx.request.body.dTitle
        diarys.dThumbs= ctx.request.body.dThumbs
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
    }
}