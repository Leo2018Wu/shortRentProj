//关于日记对象的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //根据用户编号查找所有收藏
    getUsave(id){
        return DAO('select * from save,`user`,house where house.hId = save.hId and save.uId = `user`.uId and save.uId = ?',[id]);
    }
    //根据收藏编号删除收藏
    deleteSave(id){
        return DAO('delete from save where sId=?',[id])
    }
    //添加收藏
    // addSave(save){
    //     return DAO('insert into save values(?,?,?,?)',
    //         [save.sId,save.sDate,save.hId,save.uId])
    // }
}
module.exports = new DB();