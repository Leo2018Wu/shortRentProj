const router =require('koa-router')()
const discountDAO = require('../model/discountDAO');
router.prefix('/discount')
router.get('/:disId',async (ctx,next)=>{
    try {
        let jasondata = await discountDAO.userdiscount(ctx.params.disId);
        ctx.body = {"code": 200, "message":'ok',data:jasondata};
    }
    catch (err) {
        ctx.body = {"code": 500, "message": '执行失败', data: []}
    }

})
module.exports = router