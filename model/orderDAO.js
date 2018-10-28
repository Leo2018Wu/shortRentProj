const DAO = require('../model/DAO')
class DB{
    // //用户添加订单
    // addOrder(order){
    //     return DAO('insert into `order` values(?,?,?,?,?,?,?)',
    //         [order.arrvialDate,order.leaveDate,order.hPrice,order.oDate,order.oStatus,order.uId,order.hId])
    // }
    //用户添加订单
    //1024修改添加订单表和入住人
    addOrder(orderoccupant){
        return DAO('call proc_addorder(?,?,?,?,?,?,?,?,?,?)',
            [orderoccupant.arrvialDate,orderoccupant.leaveDate,orderoccupant.hPrice,orderoccupant.oDate,orderoccupant.oStatus,orderoccupant.uId,orderoccupant.hId,orderoccupant.occName,orderoccupant.occCordId,orderoccupant.occPhone])
    }
    //获取指定编号的订单
    getOneorder(oId){
        return DAO('select * from `order` where oId = ?',[oId]);
    }
    //获取当前数据库里面的最大的oId接口
    getMaxOrder(){
        return DAO('select * from `order` order by oId desc limit 1',[]);
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