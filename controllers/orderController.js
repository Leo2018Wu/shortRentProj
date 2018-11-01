var orderDAO = require('../model/orderDAO');
module.exports = {
    //1024修改添加订单和入住人：用户添加订单
    userorder: async (ctx,next)=>{
        let query =ctx.request.body;
        let orderoccupant ={};
        orderoccupant.arrvialDate= query.arrvialDate;
        orderoccupant.leaveDate= query.leaveDate;
        orderoccupant.hPrice= query.hPrice;
        // orderoccupant.oDate= query.oDate;
        orderoccupant.oStatus= query.oStatus;
        orderoccupant.uId= query.uId;
        orderoccupant.hId= query.hId;
        orderoccupant.occName= query.occName;
        orderoccupant.occCordId= query.occCordId;
        orderoccupant.occPhone= query.occPhone;
        try {
            await orderDAO.addOrder(orderoccupant);
            ctx.body = {"code": 200, "message":'ok',data:orderoccupant}
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '执行失败', data: []}
        }
    },
    //修改订单状态
    updateorder: async (ctx,next)=>{
        let query =ctx.request.body;
          let order ={};
          order.oId= query.oId;
           order.oStatus= query.oStatus;
        let jsondata = await orderDAO.updateorder(order);
        ctx.set('content-type', 'application/json');
        ctx.body = {"code": 200, "message": "OK", data: jsondata}
        },
    //
}



