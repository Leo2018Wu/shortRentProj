const replyDAO = require('../model/replyDAO');
module.exports = {
    addReply:async (ctx,next)=>{
        //1,收集数据(可能存在问题)
        let reply = {};
        reply.rContent = ctx.request.body.rContent;
        reply.rDate = new Date();
        reply.aId = ctx.params.aId;
        try{
            await replyDAO.addReply(reply);
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    delReply:async (ctx,next)=>{
        try{
            let jsondata = await replyDAO.delReply(ctx.params.rId);
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }
};