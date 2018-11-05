//关于房屋对象的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //房屋信息匹配显示根据传的城市名(按点赞数排序)
    locationHouse(location){
        return DAO('select hId,hPic1,hName,hPrice,hLocation from house where hCity = ? order by hThumbs',[location])
    }
    //按照评分高低显示房屋方法
    scoreOrderHouse(){
        return DAO('select * from house order by hScore',[]);
    }
    //按照价格高低显示房屋方法
    priceOrderHouse(){
        return DAO('select hId,hPic1,hName,hPrice,hLocation from house order by hPrice',[])
    }
    //获取点击之后详情房屋信息
    getOneHouse(id){
        return DAO('select * from house where hId= ?',[id]);
    }
    //获取评价内容
    showContent(hId){
        return DAO('call assContent',[hId])
    }
    //筛选房屋功能模块
    //1.根据始发时间和离开日期筛选房屋信息显示
    dateHouse(date1,date2){
        return DAO('select house.hId,hPic1,hName,house.hPrice,hLocation from `order` left join house on house.hId=`order`.hId WHERE  ? > `order`.leaveDate or ? <`order`.arrvialDate',[date1,date2])
    }
    //2.首页的按风格分类推送房源信息只需显示房屋图片
    styleHouse(){
        return DAO('select * from house WHERE hThumbs in(SELECT max(hThumbs) from house group by hType)',[])
    }
    //3.输入房名，位置，房屋风格，交通情况关键字模糊查询
    keyWordHouse(keyName,keyLoca,keyStyle,keyTra){
        return DAO('SELECT hId,hPic1,hName,hPrice,hLocation from house WHERE hName like ? or hType like ? or hLocation like ? or trafficInfo like ?' ,[keyName,keyLoca,keyStyle,keyTra])
    }
    //4.按照房屋类型筛选风格
    typeHouse(type){
        return DAO('select hId,hPic1,hName,hPrice,hLocation from house where hType= ? ',[type])
    }
    //5.按照人数筛选房屋显示信息
    perNumHouse(per){
        return DAO('select hId,hPic1,hName,hPrice,hLocation  from house where hLimitPr <= ?',[per])
    }
    //6.按照价格筛选房屋显示信息
    priceHouse(price){
        return DAO('select hId,hPic1,hName,hPrice,hLocation  from house where hPrice <= ?',[price])
    }
    //7.按照房屋所带设施去筛选合适房屋信息(有问题)
    // facilityHouse(facil){
    //     return DAO('select hId,hPic1,hName,hPrice,hLocation from house where json_extract\< hfacility,\'$.?\'\>=1',[facil])
    // }
}
module.exports = new DB();
