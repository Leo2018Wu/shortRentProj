//关于日记对象的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部日记中推荐日记的方法
    getDiarys(id){
        return DAO(' select * from diary,`user`,house where house.hId = diary.hId and `user`.uId = diary.uId  and diary.recommend = ?',[id]);
    }
    //获取指定房源编号的日记信息方法
    getHDiarys(id){
        return DAO('select * from diary,`user`,house where house.hId = diary.hId and `user`.uId = diary.uId and diary.hId = ?',[id]);
    }
    //获取指定用户编号的日记信息方法
    getUDiarys(id){
        return DAO('select * from diary,`user`,house where house.hId = diary.hId and `user`.uId = diary.uId and diary.uId = ?',[id]);
    }
    //获取指定日记编号的全部日记信息方法
    getDDiarys(id){
        return DAO('select * from diary,`user`,house where house.hId = diary.hId and `user`.uId = diary.uId  and diary.dId = ? ',[id]);
    }
    //添加一个日记的信息方法
    addDiarys(diary){
        return DAO('insert into diary values(?,?,?,?,?,?,?,?,?,?,?)',
            [diary.dId,diary.arrvialDate,diary.dContent,diary.dDate,diary.recommend,diary.uId,diary.hId,diary.dTitle,diary.dThumbs,diary.dImages,diary.oId])
    }
    //删除一个日记的信息方法
    deleteDiarys(id){
        return DAO('call proc_diary(?)',[id])
    }
    //添加一个日记评论信息方法
    addAssessments(diaryassessment){
        return DAO('insert into diaryassessment values(?,?,?,?)',
            [diaryassessment.daId,diaryassessment.daDate,diaryassessment.daContent,diaryassessment.dId])
    }
    //根据日记编号显示日记评论查看
    getAssessments(id){
        return DAO('select * from diaryassessment where dId = ?',[id])
    }
    //根据日记编号和用户编号显示日记评论查看
    getUandAssessments(dId){
        return DAO('select `user`.uName,`user`.uHeadPic,daDate,daContent FROM `user`,diaryassessment WHERE `user`.uId = diaryassessment.uId and diaryassessment.dId = ?',[dId])
    }
    //删除一个日记评论信息方法
    deleteAssessments(id){
        return DAO('delete from diaryassessment where daId = ?',[id])
    }
}
module.exports = new DB();