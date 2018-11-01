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
    //获取指定编号的订单的详情
    getOneorder(oId){
        return DAO('SELECT * FROM `order` where oId = ?',[oId]);
    }
    //获取当前数据库里面的最大的oId接口
    getMaxOrder(){
        return DAO('select * from `order` order by oId desc limit 1',[]);
    }
    //用户获取全部订单信息
    getOrders(uId){
        return DAO('SELECT * FROM `order`,house where `order`.hId = house.hId and `order`.uId = ?',[uId]);
    }
    //修改订单状态
    updateorder(order){
        return DAO('update `order` set oStatus = ? where oId = ?',
            [order.oStatus,order.oId])
    }
    // 删除指定订单
    // delOrder(oId){
    //     return DAO('DELETE from `order` where oId = ?',[oId] );
    // }
    // 删除指定订单
    // delallOrder(uId){
    //     return DAO('DELETE from `order` where uId = ?',[uId] );
    // }
    //根据用户编号查询待支付的订单
    getWaitorder(uId){
        return DAO('SELECT * FROM `order`,house where`order`.hId = house.hId and`order`.oStatus =0 and  `order`.uId = ? order by oDate desc',
            [uId]);
    }
    //根据用户编号查询支付成功订单
    getSuccessorder(uId){
        return DAO('SELECT * FROM `order`,house where`order`.hId = house.hId and`order`.oStatus =1 and  `order`.uId = ? order by oDate desc',
            [uId]);
    }
    //根据用户编号查询订单完成的订单
    getFinishorder(uId){
        return DAO('SELECT * FROM `order`,house where`order`.hId = house.hId and`order`.oStatus =2 and  `order`.uId = ? order by oDate desc',
            [uId]);
    }
    //根据用户编号查询退订的订单
    getCancleorder(uId){
        return DAO('SELECT * FROM `order`,house where`order`.hId = house.hId and`order`.oStatus =-1 and  `order`.uId = ? order by oDate desc',
            [uId]);
    }
    //根据订单编号多表查询生成的订单
    getOrderDetail(oId){
        return DAO('SELECT house.hName,house.hLocation,`order`.arrvialDate,`order`.leaveDate,occupant.occName,' +
            'occupant.occCordId,occupant.occPhone,`user`.uTrueName,`user`.uPhone,house.hPrice FROM `order`,`user`,house,' +
            'occupant,order_has_occupant WHERE `order`.uId = `user`.uId AND `order`.hId = house.hId AND' +
            ' `order`.oId = order_has_occupant.oId AND `user`.uId = occupant.uId AND occupant.occId = order_has_occupant.occId ' +
            'AND `order`.oId = ?',[oId]);
    }
}
module.exports = new DB();