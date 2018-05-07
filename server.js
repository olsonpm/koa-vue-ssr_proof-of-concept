//---------//
// Imports //
//---------//

import 'source-map-support/register'

import chalk from 'chalk'
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
  const koaRouter = new KoaRouter()

  koaRouter.get('*', ctx => {
    const { renderToString } = getRenderer(),
      vueContext = { url: ctx.url }

    return renderToString(vueContext)
      .then(html => {
        const statusCode = vueContext.statusCode || 200
        // eslint-disable-next-line no-console
        console.log('statusCode from server: ' + statusCode)
        ctx.status = statusCode
        ctx.body = html
      })
      .catch(logError)
  })

  return koaRouter
}

function logUnhandledRejections() {
  process.on('unhandledRejection', (reason, p) => {
    // eslint-disable-next-line no-console
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
  })
}
