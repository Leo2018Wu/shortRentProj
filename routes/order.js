const router =require('koa-router')()
const orderController = require('../controllers/orderController');
const orderDAO = require('../model/orderDAO');
router.prefix('/order')
//用户添加订单
router.post('/',async (ctx,next)=>{
     let jsondata = orderController.userorder(ctx,next);
    ctx.body = {"code": 200, "message":'ok',data:jsondata}
})
//获取订单表中oId最大的订单号
router.get('/getmaxorder',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO.getMaxOrder();
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
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
// router.get('/getallorder/:uId',async (ctx,next)=>{
//     await adminCtroller.updateorder(ctx,next)
// })
//根据订单号修改订单状态
router.post('/updateorder',async (ctx,next)=>{
    await orderController.updateorder(ctx,next)
    // console.log('修改成功')
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
//查询某用户的待支付订单
router.get('/getWaitorder/:uId',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO.getWaitorder(ctx.params.uId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})
//查询某用户的支付成功订单
router.get('/getSuccessorder/:uId',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO.getSuccessorder(ctx.params.uId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})
//查询某用户的已完成订单
router.get('/getFinishorder/:uId',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO.getFinishorder(ctx.params.uId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})
//查询某用户的已退订的订单
router.get('/getCancleorder/:uId',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO. getCancleorder(ctx.params.uId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})
//查询订单详情
router.get('/getOrderDetail/:oId',async (ctx,next)=>{
    try {
        let jasondata = await orderDAO.getOrderDetail(ctx.params.oId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata}
        return;
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }
})

module.exports = router



