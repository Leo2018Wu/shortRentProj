const router =require('koa-router')()
const orderController = require('../controllers/orderController');
router.prefix('/order')
//用户添加订单
router.post('/',async (ctx,next)=>{
    let query = ctx.request.body;
    let jsondata = orderController.userorder(query,next)
    console.log('第一步传数据');
    console.log(query);

})
router.post('/getoneorder',async (ctx,next)=>{
    let query = ctx.request.body;
    let jsondata = orderController.getOneorder(query,next)
    console.log('第一步传数据');
    console.log(query);
})
router.post('/getallorder',async (ctx,next)=>{
    let query = ctx.request.body;
    let jsondata = orderController.getallorder(query,next)
    console.log('第一步传数据');
    console.log(query);
})
router.post('/delorder',async (ctx,next)=>{
    let query = ctx.request.body;
    let jsondata = orderController.delorder(query,next)
    console.log('第一步传数据');
    console.log(query);
})
module.exports = router



