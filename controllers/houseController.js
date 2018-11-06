var houseDAO = require('../model/houseDAO')
module.exports = {
   locationHouse:async (ctx,next) => {
        try{
            let jsondata = await houseDAO.locationHouse(ctx.request.body.hCity);
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    scoreOrderHouse:async(ctx,next)=>{
        try{
            let jsondata = await houseDAO.scoreOrderHouse();
            ctx.set('content-type','application/json')
            ctx.body = {"code":200,"message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    priceOrderHouse:async (ctx,next)=>{
        try{
            let jsondata = await houseDAO.priceOrderHouse();
            ctx.set('content-type','application/json')
            ctx.body={"code":"200","message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    getOneHouse:async(ctx,next)=>{
        try{
            let jsondata=await houseDAO.getOneHouse(ctx.params.hId)

            ctx.body={"code":"200","message":"ok",data:jsondata};
        }
        catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    showContent:async (ctx,next)=>{
        try{
            let jsondata=await houseDAO.showContent(ctx.params.hId);
            ctx.set('content-type','application/json')
            ctx.body={"code":"200","message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    styleHouse:async(ctx,next)=>{
        try{
            let jsondata = await houseDAO.styleHouse();
            ctx.set('content-type','application/json')
            ctx.body={"code":"200","message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //筛选模块
    dateHouse:async(ctx,next)=>{
       try{
           let jsondata=await houseDAO.dateHouse(ctx.request.body.hArrvialDate)
           ctx.set('content-type','application/json')
           ctx.body={"code":"200","message":"ok",data:jsondata}
       }catch (err) {
           ctx.body = {"code":500,"message":err.toString(),data:[]}
       }
    },
    keyWordHouse:async (ctx,next)=>{
      try{
          let jsondata=await houseDAO.keyWordHouse(ctx.request.body.keyName,ctx.request.body.keyLoca,ctx.request.body.keyStyle,ctx.request.body.keyTra)
          ctx.body={"code":"200","message":"ok",data:jsondata}
      } catch (err) {
          ctx.body = {"code":500,"message":err.toString(),data:[]}
      }
    },
    typeHouse:async(ctx,next)=>{
       try{
           let jsondata=await houseDAO.typeHouse(ctx.request.body.hType)
           ctx.body={"code":"200","message":"ok",data:jsondata}
       }catch(err){
           ctx.body = {"code":500,"message":err.toString(),data:[]}
       }
    },
   perNumHouse:async(ctx,next)=>{
       try{
           let jsondata=await houseDAO.perNumHouse(ctx.params.hLimitPer)
           ctx.body={"code":"200","message":"ok",data:jsondata}
       }catch (err) {
           ctx.body = {"code":500,"message":err.toString(),data:[]}

       }
   },
    priceHouse:async(ctx,next)=>{
        try{
            let jsondata=await houseDAO.priceHouse(ctx.params.hPrice)
            ctx.body={"code":"200","message":"ok",data:jsondata}
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    facilityHouse:async(ctx,next)=>{
       try{
           let jsondata=await houseDAO.facilityHouse(ctx.request.body.hfacility);
       }catch(err){
           ctx.body = {"code":500,"message":err.toString(),data:[]}
       }
    },

}
