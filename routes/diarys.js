const router = require('koa-router')()
const diarysDAO = require('../model/diarysDAO')
const diarysCtroller = require('../controllers/diarysController')
const formidable = require("formidable");
var path = require('path')
var mysql = require('mysql')
//diarys根路由
router.prefix('/diarys')
//推荐的日记
router.get('/:recommend',async (ctx,next)=>{
    await diarysCtroller.getDiarys(ctx,next)
})
//房源对应的日记
 router.get('/hdiarys/:hId',async (ctx,next)=>{
     await diarysCtroller.getHDiarys(ctx,next)
})
//查询用户所写日记
router.get('/udiarys/:uId',async (ctx,next)=>{
    await diarysCtroller.getUDiarys(ctx,next)
})
//日记详情
router.get('/ddiarys/:dId',async (ctx,next)=>{
    await diarysCtroller.getDDiarys(ctx,next)
})
//添加日记
router.post('/orders/add/:oId',async (ctx,next)=>{
    await diarysCtroller.addDiarys(ctx,next)
    console.log('添加成功')
})
//删除日记
router.get('/delete/:dId',async (ctx,next)=>{
    await diarysCtroller.deleteDiarys(ctx,next)
    console.log('删除成功')
})
//根据日记编号显示日记评论
router.get('/ddiarys/Assessments/:dId',async (ctx,next)=>{
    await diarysCtroller.getAssessments(ctx,next)
})
//添加日记评论
router.post('/ddiarys/addAssessments/:dId',async (ctx,next)=>{
    await diarysCtroller.addAssessments(ctx,next)
    console.log('添加成功')
})
//删除日记评论
router.get('/deleteAssessments/:daId',async (ctx,next)=>{
    await diarysCtroller.deleteAssessments(ctx,next)
    console.log('删除成功')
})
//上传图片到服务器
router.post('/upload',async (ctx, next) => {
    const form = new formidable.IncomingForm()
    form.uploadDir = "../public/uploadfile";
    form.keepExtensions = true;
    let urlImages= []
    return new Promise(function(resolve,reject){
        form.parse(ctx.req,function(err,fields,files){
            if(err) reject(err.message)
            console.log('获取数据文件了......')
            // if(err){console.log(err); return;}
            for(name in files){
                urlImages.push(path.parse(files[name].path).base)
            }
            console.log(urlImages)
            resolve(urlImages)
        })
    }).then((data)=>{
        //按wangeditor格式,输出结果,把上传的文件名返回
        ctx.body = {errno:0,data:data};
    });

})
module.exports = router
