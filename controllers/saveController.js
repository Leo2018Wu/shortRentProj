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
    }
}