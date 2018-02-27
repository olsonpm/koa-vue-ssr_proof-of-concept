//---------//
// Imports //
//---------//

import 'source-map-support/register'

import chalk from 'chalk'
import createVueRouter from './create/router'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import path from 'path'

import initDevServer from 'koa-vue-ssr_init-dev-server'
import _client from './config/webpack/client'
import _ssr from './config/webpack/ssr'

import { logError } from './utils'

//
//------//
// Init //
//------//

const highlight = chalk.green,
  serverPort = 8085,
  webpackHotClientPort = 8086,
  templatePath = path.join(__dirname, 'index.template.html'),
  webpackConfigs = {
    client: _client,
    ssr: _ssr,
  }

logUnhandledRejections()

//
//------//
// Main //
//------//

initDevServer({
  koaApp: new Koa(),
  webpackConfigs,
  webpackHotClientPort,
  templatePath,
})
  .then(({ getRenderer, koaApp }) => {
    const koaRouter = createKoaRouter(getRenderer)

    koaApp
      .use(koaRouter.routes())
      .use(koaRouter.allowedMethods())
      .listen(serverPort)

    // eslint-disable-next-line no-console
    console.log(`The server is running on port: ${highlight(serverPort)}`)
  })
  .catch(logError)

//
//------------------//
// Helper Functions //
//------------------//

function createKoaRouter(getRenderer) {
  const koaRouter = new KoaRouter(),
    vueRouter = createVueRouter()

  koaRouter.get('*', ctx => {
    const { renderToString } = getRenderer(),
      { url } = ctx

    if (matches404(vueRouter, url)) ctx.status = 404

    return renderToString({ url }).then(html => {
      ctx.body = html
    })
  })

  return koaRouter
}

function matches404(vueRouter, url) {
  const matchedRouteRecords = vueRouter.match(url).matched

  return (
    matchedRouteRecords.length === 1 &&
    matchedRouteRecords[0].name === 'notFound'
  )
}

function logUnhandledRejections() {
  process.on('unhandledRejection', (reason, p) => {
    // eslint-disable-next-line no-console
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
  })
}
