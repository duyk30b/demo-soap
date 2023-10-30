var soap = require('soap');
const express = require('express')
const app = express()

const start = async () => {
    var url = 'http://localhost:8001/MyFunction?wsdl';

    const clientSoap = await soap.createClientAsync(url)
    console.log(JSON.stringify(clientSoap.describe(), null, 2));

    app.get('/test-normal', (req, res) => {
        const data = {
            productCode: 'XXA02',
            productName: 'Phil',
            wrongField: 'not allow'
        }
        clientSoap.MyFunction(data, function (err, result) {
            console.log("result: ", result);
        });
        res.json({ message: 'success' })
    })

    app.get('/test-promise', async (req, res) => {
        const data = {
            productCode: 'XXA02',
            productName: 'Phil',
            wrongField: 'not allow'
        }
        const result = await clientSoap.HeadersAwareFunction(data);
        console.log('🚀 ~ file: client.js:31 ~ app.get ~ result:', result)
        res.json({ message: 'success' })
    })

    app.listen(8002, () => {
        console.log(`Example app: http://localhost:8002/test-normal`)
    })
}


start()



