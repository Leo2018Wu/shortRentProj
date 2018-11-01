const saveDAO = require('../model/saveDAO')
module.exports = {
    //查询用户的收藏
    getUsave:async (ctx,next) => {
        try{
            let jsonData = await saveDAO.getUsave(ctx.params.uId)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonData}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    deleteSave:async (ctx,next)=>{
        try{
            let jsondata = await saveDAO.deleteSave(ctx.params.sId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

    addSave:async (ctx,next)=>{
        let query = ctx.request.body;
        let save = {};
        save.sDate = query.sDate;
        save.hId = query.hId;
        save.uId= query.uId;
        try{
            let jsondata = await saveDAO.addSave(save);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

}