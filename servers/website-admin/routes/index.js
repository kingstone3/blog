const router = require('koa-router')();
const { VENDORS_VERSION } = require('../../../browsers/common/config');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    VENDORS_VERSION,
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
