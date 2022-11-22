const ws = require('ws')

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`server started on 5000`))



wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                messageToAll(message)
                break;
            case 'connenction':
                messageToAll(message)
                break
        
        }
    })
})

function messageToAll(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

