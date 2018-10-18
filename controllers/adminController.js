var adminDAO = require('../model/adminDAO')
var formidable = require('formidable')
var fs = require('fs')
var path = require('path')
module.exports = {
    adminlogin: async (ctx, next) => {
        let query = ctx.request.body;
        try {
            let login = await adminDAO.adminlogin();
            for(let i=0;i<login.length;i++){
                if(query.adminPwd == login[i].adminPwd && query.adminName == login[i].adminName) {
                    ctx.body = {'code': 200, 'message': '登录成功', data:query};
                }else{
                    ctx.body = {"code": 500, "message": '登录失败', data: []}
                }
            }
        }
        catch (err) {
            ctx.body = {"code": 500, "message": '执行失败', data: []}
        }
    },
    addhouses: async (ctx, next) => {
        var form = new formidable.IncomingForm();
        form.parse(ctx.req,function (err,fields,files) {
            var src = files.hPic1.path;
            var des = path.join(__dirname,'../','public/uploadfile',path.basename(src)+'.jpg');
            console.log('图片路径'+des);
            console.log('fields123'+ctx.fields)
            fs.copyFile(src,des,function () {
                console.log('文件复制成功');
            });
            //1.收集数据
            let house = {};
            house.hId =fields.hId
            house.hName = fields.hName
            house.hPic1 = des
            house.hPic2 = fields.hPic2
            house.hPic3 = fields.hPic3
            house.hPic4 = fields.hPic4
            house.hInfo = fields.hInfo
            house.insideInfo = fields.insideInfo
            house.trafficInfo = fields.trafficInfo
            house.surroundInfo = fields.surroundInfo
            house.hType = fields.hType
            house.hfacilily = fields.hfacilily
            house.hPrice = fields.hPrice
            house.hCity =fields.hCity
            house.hLocation =fields.hLocation
            house.hSave = fields.hSave
            house.hBeds = fields.hBeds
            house.hLimitPr =fields.hLimitPr
            house.Thumbs = fields.Thumbs
            house.hScore = fields.hScore
            house.hState = fields.hState
            house.hArrivalDate = fields.hArrivalDate
            house.hLeaveDate = fields.hLeaveDate
            house.hDiaryNo = fields.hDiaryNo
            house.hAssessmentNo = fields.hAssessmentNo
            console.log(house)
            //2.调用用户数据访问对象的添加方法
            adminDAO.addhouses(house)
        })
        try {
            //3.反馈结果
            ctx.body = {"code": 200, "message": "ok", data: []}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    getOnehouses: async (ctx, next) => {
    try{
        let jsonData = await adminDAO.getOnehouses(ctx.params.hId)
    //3.反馈结果
    ctx.body = {"code":200,"message":"ok",data:jsonData}
}catch(err){
    ctx.body = {"code":500,"message":err.toString(),data:[]}
}
    },
    deletehouses: async (ctx, next) => {
        //1.收集数据
        let id = ctx.params.hId
        try {
            //2.调用日记数据访问对象的删除方法
            await adminDAO.deletehouses(id)
            //3.反馈结果
            ctx.body = {"code": 200, "message": "ok", data: []}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //获取全部房源信息
    gethouses: async (ctx, next) => {
        try {
            let jsonData = await adminDAO.gethouses(ctx, next)
            //3.反馈结果
            ctx.body = {"code": 200, "message": "ok", data: jsonData}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    updatehouses:async (ctx, next) => {
        //1.收集数据
        let house = {};
        house.hName =ctx.request.body.hName
        house.hPic1 = ctx.request.body.hPic1
        house.hPic2 = ctx.request.body.hPic2
        house.hPic3 = ctx.request.body.hPic3
        house.hPic4 = ctx.request.body.hPic4
        house.hInfo = ctx.request.body.hInfo
        house.insideInfo = ctx.request.body.insideInfo
        house.trafficInfo = ctx.request.body.trafficInfo
        house.surroundInfo = ctx.request.body.surroundInfo
        house.hType = ctx.request.body.hType
        house.hfacilily = ctx.request.body.hfacilily
        house.hPrice = ctx.request.body.hPrice
        house.hCity = ctx.request.body.hCity
        house.hLocation = ctx.request.body.hLocation
        house.hSave = fields.hSave
        house.hBeds = ctx.request.body.hBeds
        house.hLimitPr = ctx.request.body.hLimitPr
        house.hThumbs = ctx.request.body.hThumbs
        house.hScore = ctx.request.body.hScore
        house.hState = fields.hState
        house.hArrivalDate = fields.hArrivalDate
        house.hLeaveDate = fields.hLeaveDate
        house.hDiaryNo = fields.hDiaryNo
        house.hAssessmentNo = fields.hAssessmentNo

        console.log(house)
        try {
            //2.调用用户数据访问对象的添加方法
            await adminDAO.updatehouses(house)
            //3.反馈结果
            ctx.body = {"code": 200, "message": "ok", data: house}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //获取全部订单信息
    getorders: async (ctx, next) => {
        try {
            let jsonData = await adminDAO.getorders(ctx, next)
            //3.反馈结果
            ctx.body = {"code": 200, "message": "ok", data: jsonData}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    }
}
