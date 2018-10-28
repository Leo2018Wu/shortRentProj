const router = require('koa-router')();
const assessmentDAO = require('../model/assessmentDAO');
const assessmentControl = require('../controllers/assessmentControl')
router.prefix('/assessment');
//显示评价：房屋详情里面根据房源编号的评价显示（ok）
router.get('/details/assessment/:hId',async (ctx,next)=>{
    try{
        let jsondata = await assessmentDAO.getHouseAssessment(ctx.params.hId);
        console.log(jsondata)
        ctx.body = {"code":200,"message":"ok",data:jsondata}
    }catch (err) {
        ctx.body = {"code":500,"message":err.toString(),data:[]}
    }
}),    //查询推荐的评价
    router.get('/details/recommend/:aCommend',async (ctx,next)=>{
        try{
            let jsondata = await assessmentDAO.getRecommendAssessment(ctx.params.aCommend);
            console.log(jsondata)
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }),

//添加评论：在房源详情页面里面添加评论（ok）
    router.post('/details/addAssessment/:oId',async (ctx,next)=>{
        await assessmentControl.addAssessment(ctx,next)
    }),
//删除评论：在房源详情页面里面删除评论
    router.get('/details/delAssessment/:aId',async (ctx,next)=>{
        await assessmentControl.delAssessment(ctx,next);
    }),
//显示评价：在用户详情里面显示评价信息（ok）
router.get('/personal/userAssessment/:uId',async (ctx,next)=>{
    try{
        let jsondata = await assessmentDAO.getUserAssessment(ctx.params.uId);
        ctx.body = {"code":200,"message":"ok",data:jsondata}
    }catch (err) {
        ctx.body = {"code":500,"message":err.toString(),data:[]}
    }
})
// 获取用户的订单号
// router.get('/personal/userOrder/:oId',async (ctx,next)=>{
//     try{
//         let jsondata = await assessmentDAO.getOneOrder(ctx.params.oId);
//         ctx.body = {"code":200,"message":"ok",data:jsondata[0]}
//     }catch (err) {
//         ctx.body = {"code":500,"message":err.toString(),data:[]}
//     }
// })
module.exports = router;