const DAO = require('../model/DAO')
class DB{
    //用户添加订单
    addOrder(order){
        console.log('第三步传数据')
        console.log(order);
        return DAO('insert into order values(?,?,?,?,?,?,?,?,?,)',
            [parseInt(order.oId),order.arrvialDate,order.leaveDate,order.hPrice,order.oDate,
                order.oStatus,parseInt(order.uId),parseInt(order.hId),parseInt(order.disId)])
    }
    //获取指定编号的订单
    getOneorder(get){
        console.log('第三步传数据')
        console.log(get);
        return DAO('select * from order where oId = ?',[get.oId]);
    }
    //用户获取全部订单信息
    getOrders(getall){
        console.log('第三步传数据')
        console.log(getall);
        return DAO('select * from order where uId = ?',[getall.uId]);
    }
    // 删除指定订单
    delOrder(del){
        console.log('第三步传数据')
        console.log(del);
        return DAO('DELETE from order where oId = ?',[del.oId] );
    }

}
module.exports = new DB();