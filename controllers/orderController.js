var orderDAO = require('../model/orderDAO');
module.exports = {
    //用户添加订单
    userorder: async (ctx,next)=>{
        let query =ctx.request.body;
        let order ={};
        order.oId= query.oid;
        order.arrvialDate= query.arrvialdate;
        order.leaveDate= query.leavedate;
        order.hPrice= query.hprice;
        order.oDate= query.odate;
        order.oStatus= query.ostatus;
        order.hId= query.hid;
        order.uId= query.uid;
        order.disId= query.disid;
        try {
            await orderDAO.addOrder(order);
            ctx.body = {"code": 200, "message":'ok',data:order}
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '执行失败', data: []}
        }
    },
}



