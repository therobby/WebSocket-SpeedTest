const http = require('http')
const fs = require('fs')
const websocket = require('ws')

const server = http.createServer((req, res) => {
    res.end(fs.readFileSync("./client.html"))
})

const ws = new websocket.Server({ server })

/**
 * ws receive two messages:
 * {nickname: "ur nickname"}
 * {message: "ur message"}
 * 
 * all messages from server will be displayed in textarea
 */

ws.on('connection', (client, req) => {

    client.on('message', (message) => {
        try {
            let msg = Number.parseInt(message)
            if (Number.isInteger(msg)) {
                client.send(JSON.stringify({ up: Date.now(), down: Date.now() - msg }))
            }
        } catch (e) {
            console.error(e)
        }
    })
})

server.listen(8008)