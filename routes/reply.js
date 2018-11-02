const router = require('koa-router')();
const replyDAO = require('../model/replyDAO');
const replyControl = require('../controllers/replyControl')
router.prefix('/reply');
//显示回复：房屋详情里面根据房源编号的评价后管理员的回复显示（ok）
router.get('/details/reply/:aId',async (ctx,next)=>{
    try{
        let jsondata = await replyDAO.getReply(ctx.params.aId);
        ctx.body = {"code":200,"message":"ok",data:jsondata}
    }catch (err) {
        ctx.body = {"code":500,"message":err.toString(),data:[]}
    }
}),
//    获取所有回复信息
    router.get('/details/allreply',async (ctx,next)=>{
        try{
            let jsondata = await replyDAO.getallReply();
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }),
//添加回复：在房源详情页面里面添加回复(差不多ok)
    router.post('/details/addReply/:aId',async (ctx,next)=>{
        await replyControl.addReply(ctx,next)
    }),
//删除回复：在房源详情页面里面删除回复
    router.get('/details/delReply/:rId',async (ctx,next)=>{
        await replyControl.delReply(ctx,next)
    })
//获取某个房源的全部回复信息
router.get('/details/onehouseReply/:hId',async (ctx,next)=>{
    try{
        let jsondata = await replyDAO.onehouseReply(ctx.params.hId);
        ctx.body = {"code":200,"message":"ok",data:jsondata}
    }catch (err) {
        ctx.body = {"code":500,"message":err.toString(),data:[]}
    }
})
module.exports = router;