//关于回复对象的相关数据操作：
const DAO = require('../model/DAO');
class Reply {
//显示某个评价的回复信息（ok）
    getReply(id){
        return DAO('select reply.* from reply left join assessment on reply.aId = assessment.aId where assessment.aId = ? ',[id]);
    }
//添加回复
    addReply(reply){
        return DAO('insert into reply(reply.rContent,reply.rDate,reply.aId) values(?,?,?)',
            [reply.rContent,reply.rDate,reply.aId]);
    }
    //获取所有回复信息
    getallReply(){
        return DAO('select * from reply');
    }
//删除回复
    delReply(id){
        return DAO('delete from reply where rId = ?',[id]);
    }
}

module.exports = new Reply();