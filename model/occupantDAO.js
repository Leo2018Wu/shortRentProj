//关于入住人对象的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //删除入住人
    deleteOccupant(id){
        return DAO('delete from occupant where occId=?',[id])
        }
    //修改入住人状态
    updateOccupant(occupant){
        return DAO('update occupant set occStatus = ? where occId = ?',
            [occupant.occStatus,occupant.occId])
    }
    //根据用户编号查询用户添加的入住人
    getOccupant(id){
        return DAO('select * from occupant where occStatus = 1 and uId=?',[id])
    }
    //添加入住人
    addOccupant(occupant){
        return DAO('insert into occupant values(?,?,?,?,?,?)',
            [occupant.occId,occupant.occName,occupant.occCordId,occupant.occPhone,occupant.occStatus,occupant.uId])
    }
    //添加订单对应的入住人
    addOccOid(occ){
        return DAO('insert into order_has_occupant(oId,occId) VALUES (?,?)',
            [occ.oId,occ.occId])
    }
    //获取当前数据库里面的最大的occId接口
    getMaxOccId(){
        return DAO('select * from occupant order by occId desc limit 1',[]);
    }
}
module.exports = new DB();