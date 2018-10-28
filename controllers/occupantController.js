var occupantDAO = require('../model/occupantDAO')
module.exports = {
    addOccupant: async (ctx, next) => {
        //1.收集数据
        let occupant = {};
        occupant.occId =ctx.request.body.occId
        occupant.occName = ctx.request.body.occName
        occupant.occCordId = ctx.request.body.occCordId
        occupant.occPhone = ctx.request.body.occPhone
        // occupant.disId = ctx.request.body.disId
        occupant.uId = ctx.request.body.uId
            console.log(occupant)
            //2.调用用户数据访问对象的添加方法
            occupantDAO.addOccupant(occupant)
        try {
            //3.反馈结果
            ctx.body = {"code": 200, "message": "ok", data: []}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    getOccupant: async (ctx, next) => {
        try{
            let jsonData = await occupantDAO.getOccupant(ctx.params.uId)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsonData}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    deleteOccupant: async (ctx, next) => {
        //1.收集数据
        let id = ctx.params.occId
        try {
            //2.调用日记数据访问对象的删除方法
            await occupantDAO.deleteOccupant(id)
            //3.反馈结果
            ctx.body = {"code": 200, "message": "ok", data: []}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
}
