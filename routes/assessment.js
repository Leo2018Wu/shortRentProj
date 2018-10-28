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
}),
    //查询推荐的评价
    router.get('/details/recommend/:recommend',async (ctx,next)=>{
        try{
            let jsondata = await assessmentDAO.getRecommendAssessment(ctx.params.recommend);
            console.log(jsondata)
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }),

//添加评论：在房源详情页面里面添加评论（ok）
    router.post('/details/addAssessment',async (ctx,next)=>{
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
// 获取所有评论信息
router.get('/personal/allAssessment',async (ctx,next)=>{
    try{
        let jsondata = await assessmentDAO.getallAssessment();
        ctx.body = {"code":200,"message":"ok",data:jsondata}
    }catch (err) {
        ctx.body = {"code":500,"message":err.toString(),data:[]}
    }
})
//获取用户，评论，回复所有信息
router.get('/allinfo',async (ctx,next)=>{
    try{
        let jsondata = await assessmentDAO.getallinfo();
        ctx.body = {"code":200,"message":"ok",data:jsondata}
    }catch (err) {
        ctx.body = {"code":500,"message":err.toString(),data:[]}
    }
})
module.exports = router;