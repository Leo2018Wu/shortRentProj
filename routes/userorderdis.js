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
router.post('/perfect',async (ctx,next)=> {
    await userController.userperfect(ctx,next);
})


//用更改用户名
router.post('/updateuName',async (ctx,next)=> {
    await userController.updateuName(ctx,next);
})
//用更改邮箱
router.post('/updateuEmail',async (ctx,next)=> {
    await userController.updateuEmail(ctx,next);
})
//用户完善真实姓名
router.post('/updateTureName',async (ctx,next)=> {
    await userController.updateTureName(ctx,next);
})
//用户完善身份证号
router.post('/updateuIdcard',async (ctx,next)=> {
    await userController.updateuIdcard(ctx,next);
})
//用户完善护照
router.post('/updateuPoss',async (ctx,next)=> {
    await userController.updateuPoss(ctx,next);
})



router.post('/updateIdInfo',async (ctx,next)=> {
    await userController.updateIdInfo(ctx,next);
})
//用户上传头像
router.post('/updatePhoto',async (ctx,next)=> {
    await userController.updatePhoto(ctx,next);
})

//用户根据ID更改密码
router.post('/perfect/idchangpwd',async (ctx,next)=>{
    await changepwdController.idchangpwd(ctx,next);
})
//用户更改密码
router.post('/perfect/password',async (ctx,next)=>{
    await changepwdController.userchangpwd(ctx,next);
})

//查询指定用户详细信息
router.get('/getUserInfos/:uId',async (ctx,next)=>{
    await userController.getUserInfo(ctx,next)
})



module.exports = router;
