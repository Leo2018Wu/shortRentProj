const router = require('koa-router')()
const saveDAO = require('../model/saveDAO')
const saveController = require('../controllers/saveController')
const formidable = require("formidable");
var path = require('path')
var mysql = require('mysql')
//save根路由
router.prefix('/save')
//用户添加收藏
router.post('/add',async (ctx,next)=> {
    await saveController.addSave(ctx, next)

})
//删除收藏')
// })
router.get('/delete/:sId',async (ctx,next)=>{
    await saveController.deleteSave(ctx,next)
    console.log('删除成功')
})
//查询用户的收藏
router.get('/uSave/:uId',async (ctx,next)=>{
    await saveController.getUsave(ctx,next)
})
module.exports = router;