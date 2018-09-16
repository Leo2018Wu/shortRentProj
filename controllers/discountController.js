var discountDAO = require('../model/discountDAO');
module.exports={
    discount:async (query,next)=>{
        let discount={};
        discount.disId = query.disid;
        discount.disType =query.distype;
        discount.disWay = query.disway;
        console.log('第二步传数据');
        console.log(discount);
        try {
            await  discountDAO.userdiscount(discount);
            ctx.body = ('用户打折成功');
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    }
}
