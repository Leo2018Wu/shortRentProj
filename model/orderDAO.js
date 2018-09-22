const DAO = require('../model/DAO')
class DB{
    //用户添加订单
    addOrder(order){
        return DAO('insert into `order` values(?,?,?,?,?,?,?,?,?)',
            [order.oId,order.arrvialDate,order.leaveDate,order.hPrice,order.oDate,order.oStatus,order.uId,order.hId,order.disId])
    }
    //获取指定编号的订单
    getOneorder(oId){
        return DAO('select * from `order` where oId = ?',[oId]);
    }
    //用户获取全部订单信息
    getOrders(uId){
        return DAO('SELECT * FROM `order` where uId = ?',[uId]);
    }
    // 删除指定订单
    delOrder(oId){
        return DAO('DELETE from `order` where oId = ?',[oId] );
    }
    // 删除指定订单
    delallOrder(uId){
        return DAO('DELETE from `order` where uId = ?',[uId] );
    }

}
module.exports = new DB();