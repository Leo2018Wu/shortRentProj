const router = require('koa-router')()
const occupantController = require('../controllers/occupantController')
const occupantDAO = require('../model/occupantDAO');
//occupant根路由
router.prefix('/occupant')
//查询用户添加的入住人
router.get('/getOccupant/:uId',async (ctx,next)=>{
    await occupantController.getOccupant(ctx,next)
})
//添加入住人
router.post('/addOccupant',async (ctx,next)=>{
    await occupantController.addOccupant(ctx,next)
    console.log('添加成功')
})
//删除入住人
router.get('/deleteOccupant/:occId',async (ctx,next)=>{
    await occupantController.deleteOccupant(ctx,next)
    console.log('删除成功')
})
//添加订单对应的入住人
router.post('/addOccOid',async (ctx,next)=>{
    await occupantController.addOccOid(ctx,next)
    console.log('添加成功')
})
//获取occId最大的记录
router.get('/getMaxOccId',async (ctx,next)=>{
    try {
        let jasondata = await occupantDAO.getMaxOccId();
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})

module.exports = router
