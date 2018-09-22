const router =require('koa-router')()
const orderController = require('../controllers/orderController');
const orderDAO = require('../model/orderDAO');
router.prefix('/order')
//用户添加订单
router.post('/',async (ctx,next)=>{
    orderController.userorder(ctx,next)
})
//用户获取指定的订单
router.get('/getoneorder/:oId',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO.getOneorder(ctx.params.oId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})
//用户获取所有订单
router.get('/getallorder/:uId',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO.getOrders(ctx.params.uId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})
//用户删除指定订单
router.get('/delorder/:oId',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO.delOrder(ctx.params.oId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})
//用户删除所有订单
router.get('/delallorder/:uId',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO.delallOrder(ctx.params.uId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})
module.exports = router



