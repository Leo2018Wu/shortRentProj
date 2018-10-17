//关于管理员的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //管理员登录
   adminlogin() {
        return DAO('select adminName,adminPwd from admin',[]);
    }

    //房源操作
    //添加房源信息
    addhouses(house){
        return DAO('insert into house values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [house.hId,house.hName,house.hPic1,house.hPic2,house.hPic3,house.hPic4,house.hInfo,house.insideInfo,house.trafficInfo,house.surroundInfo,house.hType,house.hfacilily,house.hPrice,house.hCity,house.hLocation,house.hSave,house.hBeds,house.hLimitPr,house.hThumbs,house.hScore,house.hState,house.hArrivalDate,house.hLeaveDate,house.hDiaryNo,house.hAssessmentNo ])
    }
    //获取全部房源信息
    gethouses(id){
        return DAO('select * from house',[id]);
    }
    //获取指定房源编号获取房源信息
    getOnehouses(id){
        return DAO('select * from house where house.hId = ?',[id]);
    }
    //更新房源信息
    updatehouses(house){
        return DAO('update house set hName = ?,hPic1 = ?,hPic2 = ?,hPic3 = ?,hPic4 = ?,hInfo = ?,insideInfo = ?,trafficInfo = ?,surroundInfo = ?,hType = ?,hfacilily = ?,hPrice = ?,hCity = ?,hLocation = ?,hSave = ? ,hBeds = ?,hLimitPr = ?,hThumbs = ?,hScore = ?,hState = ?,hArrivalDate = ?,hLeaveDate=?,hDiaryNo =?,hAssessmentNo =?'
            [house.hName,house.hPic1,house.hPic2,house.hPic3,house.hPic4,house.hInfo,house.insideInfo,house.trafficInfo,house.surroundInfo,house.hType,house.hfacilily,house.hPrice,house.hCity,house.hLocation,house.hSave,house.hBeds,house.hLimitPr,house.hThumbs,house.hScore,house.hState,house.hArrivalDate,house.hLeaveDate,house.hDiaryNo,house.hAssessmentNo])
    }
    //删除房源信息
    deletehouses(id){
        return DAO('call proc_house(?)',[id])
    }
    //订单操作
    //根据订单号查询订单信息
    getOneOrders(id){
        return DAO('select * from `order` where oId = ?',[id]);
    }
    //获取全部订单信息
    getorders(id){
        return DAO('select * from order',[id]);
    }
}
module.exports = new DB();