const express = require('express');
const app = express()
const session = require('express-session');
const { Server} = require('socket.io');
const { createServer} = require('http')

const httpserver = createServer(app)

const io = new Server(httpserver,{});
 global.x_session= session({
    secret:"abcd13",
    resave:false,
    saveUninitialized:false,
})
require("./Main/Messages/socket_config")(io)


app.use(x_session)

// const basicAuth = require('express-basic-auth');
//  app.use(basicAuth({
//      users: { 'admin': 'p123' },
//      challenge: true,
//   }))


// app.use(function(req, res, next) {
//     res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       next();
//     });

app.set("view engine","ejs");
const host="0.0.0.0"
app.set('case sensitive routing', true);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./Main/products"))
app.use(require("./Main/signup"))
app.use(require("./Main/login"))
app.use(require("./Main/purchase"))
app.use(require("./Main/buyers_dash"))
app.use(require("./Main/sales"))
app.use(require("./Main/setting"))
app.use(require("./Main/Messages/chat_backend"))
app.use(require("./Main/Messages/messages_seller"))

httpserver.listen(3000,host)