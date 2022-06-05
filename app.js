const express=require('express');
const expressWs = require('express-ws');
const websocket = require('./websocket.js');
const app=express()
const port =3000;
expressWs(app)

//中间件
app.use('/libai',express.static('public/libai.html'))
app.use('/dufu',express.static('public/dufu.html'))
app.use(express.static('public'))

/* ws://localhost:3000/ws */
app.use('/ws',websocket)


app.get("/*",(req,res)=>{

})
//监听端口
app.listen(port,()=>{
    console.log(`server is running at  http://localhost:${port}`)
})