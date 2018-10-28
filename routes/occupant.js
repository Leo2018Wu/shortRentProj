const router = require('koa-router')()
const occupantController = require('../controllers/occupantController')
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
module.exports = router
