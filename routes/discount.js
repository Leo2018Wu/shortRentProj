const router =require('koa-router')()
const discountController =require('../controllers/discountController');
router.prefix('/discount')
router.post('/',async (ctx,next)=>{
    let query = ctx.request.body;
    let jasonData = discountController.discount(query,next)
    console.log('第一步传数据');
    console.log(query);

})
module.exports = router