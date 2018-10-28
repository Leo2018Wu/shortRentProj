//关于入住人对象的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //删除入住人
    deleteOccupant(id){
        return DAO('delete from occupant where occId=?',[id])
        }
    //根据用户编号查询用户添加的入住人
    getOccupant(id){
        return DAO('select * from occupant where uId=?',[id])
    }
    //添加入住人
    addOccupant(occupant){
        return DAO('insert into occupant values(?,?,?,?,?)',
            [occupant.occId,occupant.occName,occupant.occCordId,occupant.occPhone,occupant.uId])
    }
}
module.exports = new DB();