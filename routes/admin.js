const router = require('koa-router')()
const adminDAO = require('../model/adminDAO')
const adminCtroller = require('../controllers/adminController')
router.prefix('/admin')
//admin根路由
//管理员登录
router.post('/login',async (ctx,next)=>{
    await adminCtroller.adminlogin(ctx,next)
})
//添加房源
router.post('/addHouses',async (ctx,next)=>{
    // console.log(ctx.request.body);
        await adminCtroller.addhouses(ctx,next)
}),
//获取全部房源信息
    router.get('/',async (ctx,next)=>{
        await adminCtroller.gethouses(ctx,next)
    })
//根据房源编号查询房源
    router.get('/getOnehouses/:hId',async (ctx,next)=>{
        await adminCtroller.getOnehouses(ctx,next)
    })
//删除房源
router.get('/deletehouse/:hId',async (ctx,next)=>{
    await adminCtroller.deletehouses(ctx,next)
    console.log('删除成功')
}),
//更新房源信息
router.post('/updatehouses/:hId',async (ctx,next)=>{
    await adminCtroller.updatehouses(ctx,next)

}),
//查询某一订单
//     router.get('/getOneOrders/:oId',async (ctx,next)=>{
//         try{
//             let jsonData = await adminDAO.getOneOrders(ctx.params.oId)
//             //3.反馈结果
//             ctx.body = {"code":200,"message":"ok",data:jsonData}
//         }catch(err){
//             ctx.body = {"code":500,"message":err.toString(),data:[]}
//         }
//     }),
//获取全部订单信息
    router.get('/',async (ctx,next)=>{
        await adminCtroller.getorders(ctx,next)
    })
module.exports = router

