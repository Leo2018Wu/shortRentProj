const router = require('koa-router')();
const userController = require('../controllers/registerController');
const usersaveController = require('../controllers/usersaveController');
const changepwdController = require('../controllers/changepwdController');
router.prefix('/userorderdis');
//用户注册
router.post('/register',async (ctx,next)=>{
    let query = ctx.request.body;
    let jsondata =  userController.userregister(query,next);
    console.log('第一步传数据');
    console.log(query);
})
//用户登录
router.post('/login',async (ctx,next)=>{
    let query =ctx.request.body;
    let jsondata = userController.userlogin(query,next)
    console.log('第一步传数据');
    console.log(query);

})
//用户完善信息
router.post('/perfect',async (ctx,next)=>{
    let query = ctx.request.body;
    let jsondata = userController.userperfect(query,next);
    console.log('第一步传数据');
    console.log(query);
})
//用户更改密码
router.post('/perfect/password',async (ctx,next)=>{
    let query = ctx.request.body;
    let jsondata = changepwdController.userchangpwd(query,next);
    console.log('第一步传数据');
    console.log(query);
})
//用户收藏房源
router.post('/housesave',async (ctx,next)=>{
    let query = ctx.request.body;
    let jsondata = usersaveController.usersave(query,next);
    console.log('第一步传数据');
    console.log(query);
})


module.exports = router
