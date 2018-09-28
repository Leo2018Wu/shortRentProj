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

//用户完善信息
router.post('/perfect',async (ctx,next)=> {
    await userController.userperfect(ctx,next);
})

//用户更改密码
router.post('/perfect/password',async (ctx,next)=>{
    await changepwdController.userchangpwd(ctx,next);
})



module.exports = router
