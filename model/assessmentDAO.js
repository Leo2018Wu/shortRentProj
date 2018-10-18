//关于评价对象的相关数据操作：
const DAO = require('../model/DAO');
class Assessment {
//按房源显示：显示某个房源评价信息（ok）（入住时间）
    getHouseAssessment(id){
        return DAO('select * from assessment where assessment.hId= ? ',[id]);
    }
//按用户显示：显示某个用户的评价信息（ok）
    getUserAssessment(id){
        return DAO('select * from assessment  where assessment.uId= ? ',[id]);
    }
//添加房源评论；用户添加某个房源评价信息(ok）
    addAssessment(assessment){
        return DAO('insert into assessment(assessment.arrvialDate,assessment.aContent,assessment.aDate,assessment.aScore,assessment.uId,assessment.oId,assessment.hId,assessment.aImages) values(?,?,?,?,?,?,?,?)',
            [assessment.arrvialDate,assessment.aContent,assessment.aDate,assessment.aScore,assessment.uId,assessment.oId,assessment.hId,assessment.aImages]);
    }
//查找订单表中的信息：
    getOneOrder(id){
        return DAO('select * from `order` where oId = ?',[id])
    }
//删除评价信息(ok)
    delAssessment(id){
        return DAO('call proc_del(?);',[id]);
    }
}
module.exports = new Assessment();