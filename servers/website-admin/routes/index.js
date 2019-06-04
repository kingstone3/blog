const router = require('koa-router')();
const { JS_VENDORS_VERSION } = require('../../../browsers/common/config');

router.get('/', async (ctx) => {
  await ctx.render('index', {
    JS_VENDORS_VERSION,
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
