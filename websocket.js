const express = require("express");
const expressWs = require("express-ws");

const router = express.Router()
expressWs(router)


let libaiArr = []
let dufuArr = []

/* ws://localhost:3000/ws/libai */

// 李白发送数据接口
router.ws('/libai', ws => {
    // ws.send('李白连接成功')
    ws.on("message", (msg) => {
        libaiArr.push(msg) //存储李白发送的数据
        // 把收到的数据返回给客户端
        ws.send(msg)
    })
})

// 杜甫接收数据接口

router.ws('/dufu2', ws => {
    let timer=null;
    ws.on('close',()=>{
        if(timer){
            clearInterval(timer)
        }
    })
    // 定时的去触发send
    timer=setInterval(() => {
        if (libaiArr.length > 0) {
            let msg = libaiArr[0];
            libaiArr.shift();
            ws.send(msg)
        }
    }, 1000);
})


// 杜甫发送数据接口
router.ws('/dufu', ws => {
    // ws.send('李白连接成功')
    ws.on("message", (msg) => {
        dufuArr.push(msg) //存储杜甫发送的数据
        // 把收到的数据返回给客户端
        ws.send(msg)
    })
})


// 李白接收数据接口
router.ws('/libai2', ws => {
    let timer=null;
    ws.on('close',()=>{
        if(timer){
            clearInterval(timer)
        }
    })
    // 定时的去触发send
    timer = setInterval(() => {
        if (dufuArr.length > 0) {
            let msg = dufuArr[0];
            dufuArr.shift();
            ws.send(msg)
        }
    }, 1000);
})


module.exports = router;