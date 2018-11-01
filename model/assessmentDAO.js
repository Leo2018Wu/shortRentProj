//关于评价对象的相关数据操作：
const DAO = require('../model/DAO');
class Assessment {
//按房源显示：显示某个房源评价信息（ok）（入住时间）
    getHouseAssessment(id){
        return DAO('select * from assessment,user where assessment.uId = user.uId and assessment.hId= ? ',[id]);
    }
    //推荐的评价
    getRecommendAssessment(id){
        return DAO(' select * from assessment,user where user.uId = assessment.uId and assessment.recommend = ?',[id]);
    }
// //    获取所有评论
    getallAssessment(){
        return DAO('select * from assessment');
    }
//获取用户，评论，回复所有信息
    getallinfo(){
        return DAO('select * from user INNER JOIN assessment on assessment.aId = user.uId INNER JOIN reply on assessment.aId = reply.aId');
    }
    //推荐的评价
    getRecommendAssessment(id){
        return DAO(' select * from assessment,user where user.uId = assessment.uId and assessment.recommend = 1',[id]);
    }
//按用户显示：显示某个用户的评价信息（ok）
    getUserAssessment(id){
        return DAO('select * from assessment,user,house where house.hId = assessment.hId and user.uId = assessment.uId and assessment.uId= ? order by aDate desc',[id]);
    }
//添加房源评论；用户添加某个房源评价信息(ok）
    addAssessment(assessment){
        return DAO('insert into assessment values(?,?,?,?,?,?,?,?,?,?)',
            [assessment.aId,assessment.arrvialDate,assessment.aContent,assessment.aDate,assessment.aScore,assessment.uId,assessment.oId,assessment.hId,assessment.aImages,assessment.aCommend]);
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