## A Koa/Vue/Ssr Proof Of Concept Development Server

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**
- [What Is This](#what-is-this)
- [Why Create It](#why-create-it)
- [How To Use It](#how-to-use-it)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### What Is This
A bare-bones vue ssr implementation using koa instead of express.  It was
written using [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)
as a reference, and also enables hot module replacement via
[koa-webpack](https://github.com/shellscape/koa-webpack).

### Why Create It
I wanted to understand how to get SSR working with vue.  Frameworks like
[Nuxt.js](https://github.com/nuxt/nuxt.js) are great at hiding the complexity,
but the complexity is exactly what I was looking to learn.

### How To Use It
The setup isn't the most intuitive, but I got what I wanted out of this project
so this is how it is.

*First clone and install dependencies*
```sh
hub clone olsonpm/koa-vue-ssr_proof-of-concept
cd koa-vue-ssr_proof-of-concept
npm ci
```

*In one terminal window*
```sh
./run dev
# triggers the webpack process which bundles the server code and outputs a file
#   'server.bundle.js' in the root project directory
```

*In another terminal window, after `./run dev` finishes*
```sh
node ./server.bundle.js
# should notify you the web server is listening on port 8085 when done
```

- In a browser visit `http://localhost:8085` and you should be taken to the
(very ugly) home view which was rendered on the server.

- Click on the `About` link and you should be taken to `/about` which was
rendered on the client.

- If you click 'Cause 404' the client will render 'Page Not Found'.  If you
refresh the page now, it will render the same view and the server will have
sent a 404 http status code.

- Now click on 'Cause error' and the client will render an error page.  Refresh
the page and the server will respond with a 500 status code.
