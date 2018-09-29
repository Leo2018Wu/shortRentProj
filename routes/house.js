const router = require('koa-router')()
const houseDAO = require('../model/houseDAO')
const houseController=require('../controllers/houseController')
router.prefix('/house')
//根据传入城市名字显示房屋信息
router.post('/',async (ctx,next)=>{
    //实现跨域允许，第二个参数代表可以跨域请求的源，*代表接受所有不同来源的请求
    ctx.set("Access-Control-Allow-Origin","http://localhost:3180")
    //await起到了then的作用，用于处理异步回调方法执行的后续工作
    await houseController.locationHouse(ctx,next)
    // await ctx.render('house',{data:jsondata})
})
router.get('/scoreOrderHouse',async (ctx,next)=>{
    await houseController.scoreOrderHouse(ctx,next)
})
router.get('/priceOrderHouse',async (ctx,next)=>{
    // await ctx.render('priceOrderHouse',{data:jsondata})
    await houseController.priceOrderHouse(ctx,next)
})
router.get('/details/:hId',async (ctx,next)=>{
    await houseController.getOneHouse(ctx,next)
})
router.get('/aContent/:hId',async(ctx,next)=>{
    await houseController.showContent(ctx,next)
})
router.get('/styleHouse',async (ctx,next)=>{
    await houseController.styleHouse(ctx,next)
})
router.post('/dateHouse',async(ctx,next) =>{
    await houseController.dateHouse(ctx,next)
})
router.post('/keywordHouse',async(ctx,next)=>{
    await houseController.keyWordHouse(ctx,next)
})
router.post('/typeHouse',async(ctx,next)=>{
    await houseController.typeHouse(ctx,next)
})
router.post('/hfacility',async(ctx,next)=>{

})
router.get('/perNumHouse/:hLimitPer',async(ctx,next)=>{
    await houseController.perNumHouse(ctx,next)
})
router.get('/priceHouse/:hPrice',async(ctx,next)=>{
    await houseController.priceHouse(ctx,next)
})
router.post('/facilityHouse',async(ctx,next)=>{
    await houseController.facilityHouse((ctx,next))
})
module.exports = router;
