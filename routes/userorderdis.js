const router = require('koa-router')();
const userDAO = require('../model/userorderdisDAO');
const userController = require('../controllers/registerController');
const changepwdController = require('../controllers/changepwdController');
router.prefix('/userorderdis');
//用户注册
router.post('/register',async (ctx,next)=>{
   await userController.userregister(ctx,next);
})
//用户登录
router.post('/login',async (ctx,next)=>{
   await userController.userlogin(ctx,next)
})
//匹配所有的手机号
router.get('/getallphone/:uPhone',async (ctx,next)=>{
    try{
        let jsondata = await userDAO.getallphone(ctx.params.uPhone);
        console.log(jsondata)
        ctx.body = {"code":200,"message":"ok",data:jsondata}
    }catch (err) {
        ctx.body = {"code":500,"message":err.toString(),data:[]}
    }
})
//获取用户的所有信息
router.post('/getuserinfo/:uPhone',async (ctx,next)=>{
    try{
        let jsondata = await userDAO.userlogin(ctx.params.uPhone);
        console.log(jsondata)
        ctx.body = {"code":200,"message":"ok",data:jsondata}
    }catch (err) {
        ctx.body = {"code":500,"message":err.toString(),data:[]}
    }
})

//用户完善信息
router.post('/perfect',async (ctx,next)=> {
    await userController.userperfect(ctx,next);
})

//用户更改密码
router.post('/perfect/password',async (ctx,next)=>{
    await changepwdController.userchangpwd(ctx,next);
})

//查询指定用户详细信息
router.get('/getUserInfos/:uId',async (ctx,next)=>{
    await userController.getUserInfo(ctx,next)
})



module.exports = router
