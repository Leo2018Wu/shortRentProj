const router = require('koa-router')();
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

//用户完善基本信息
router.post('/perfect',async (ctx,next)=> {
    await userController.userperfect(ctx,next);
})
//用户完善身份信息
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

//查询指定用户详细信息
router.get('/getUserInfos/:uId',async (ctx,next)=>{
    await userController.getUserInfo(ctx,next)
})



module.exports = router;
