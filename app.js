const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// const cors = require('koa2-cors')

const index = require('./routes/index')
const userorderdis = require('./routes/userorderdis')
const order = require('./routes/order')
const discount =require('./routes/discount')
const admin = require('./routes/admin')
const diarys =require('./routes/diarys')
const house=require('.routes/house')
const assessment=require('.routes/assessment')
const reply=require('.routes/reply')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
//app.use(views(__dirname + '/views', {
//   map: {html:'ejs'}
// }))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//跨域请求
// app.use(cors({
//     origin: function (ctx) {
//         return 'http://localhost:63342'; //这样就能只允许 http://localhost:63342 这个域名的请求了
//     },
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     maxAge: 5,
//     credentials: true,
//     allowMethods: ['GET', 'POST', 'DELETE'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(userorderdis.routes(),userorderdis.allowedMethods())
app.use(order.routes(), order.allowedMethods())
app.use(discount.routes(),discount.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(diarys.routes(),diarys.allowedMethods())
app.use(house.routes(), house.allowedMethods())
app.use(assessment.routes(), assessment.allowedMethods())
app.use(reply.routes(), reply.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
