var orderDAO = require('../model/orderDAO');
module.exports = {
    //用户添加订单
    userorder: async (query,next)=>{
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
        console.log('第二步传数据');
        console.log(order);
        try {
            await orderDAO.addOrder(order);
            ctx.body = ('您订单成功');
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //获取指定编号的订单
    getOneorder: async (query,next) =>{
        let get = {};
        get.oId = query.oid;
        console.log('第二步传数据');
        console.log(get);
        try {
            await orderDAO.getOneorder(get);
            ctx.body = ('您获取订单信息成功');
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    // 获取全部订单信息
    getallorder:async (query,next) =>{
        let getall={};
        getall.uId = query.uid;
        getall.oId = query.oid;
        console.log('第二步传数据');
        console.log(getall);
        try {
            await orderDAO.getOrders(getall);
            ctx.body = ('您获取订单信息成功');
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //删除订单
    delorder:async (query,next) =>{
        let  del={};
        del.oId = query.oid;
        del.uId = query.uid;
        console.log('第二步传数据');
        console.log(del);
        try {
            await orderDAO.delOrder(del);
            ctx.body = ('您删除订单成功');
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },



}



// getOrders(){
//     return DAO('select * from order',[]);
// }
// //获取指定编号的订单
// getOneorder(id){
//     return DAO('select * from order where oId = ?',[id]);
// }
