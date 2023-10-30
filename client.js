var soap = require('soap');
const express = require('express')
const app = express()

const start = async () => {
    var url = 'http://localhost:8001/BookFunction?wsdl';

    const clientSoap = await soap.createClientAsync(url)
    console.log(JSON.stringify(clientSoap.describe(), null, 2));

    clientSoap.addSoapHeader({
        'x-auth': 'demoUser'
    });

    app.get('/test-normal', (req, res) => {
        const data = {
            key: Date.now().toString(36),
            productCode: 'XXA02',
            productName: 'Phil',
            timeRequest: new Date().toISOString()
        }
        const options = {}
        const extraHeaders = {}

        clientSoap.BookList(
            data,
            options,
            extraHeaders,
            function (err, result, rawResponse, soapHeader, rawRequest) {
                console.log('🚀 ~ clientSoap.BookList ~ err:', err)
                console.log('🚀 ~ clientSoap.BookList ~ result:', result)
                console.log('🚀 ~ clientSoap.BookList ~ soapHeader:', soapHeader)
            });
        res.json({ message: 'success' })
    })

    app.get('/test-promise', async (req, res) => {
        const response = await new Promise(resolve => {
            clientSoap.BookCreate({
                key: Date.now().toString(36),
                productCode: 'XXA02',
                productName: 'Phil',
                timeRequest: new Date().toISOString()
            }, function (err, result, rawResponse, soapHeader, rawRequest) {
                console.log('🚀 ~ clientSoap.BookCreate ~ err:', err)
                console.log('🚀 ~ clientSoap.BookCreate ~ result:', result)
                console.log('🚀 ~ clientSoap.BookCreate ~ soapHeader:', soapHeader)
                resolve(result)
            });
        })
        res.json(response)
    })


    app.listen(8002, () => {
        console.log(`Example app: http://localhost:8002/test-normal`)
    })
}


start()



