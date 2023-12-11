var soap = require('soap');
const express = require('express')
const app = express()

const start = async () => {
    // let url = 'http://sap.com/xi/A1S/Global/ManagePurchaseRequestIn/MaintainBundleRequest';
    // let url = 'http://www.sap.com/webas/710/soap/features/transportbinding';
    // let url = 'https://my350617.sapbydesign.com/sap/bc/srt/scs/sap/managepurchaserequestin';
    // let url = 'https://my350617.sapbydesign.com/sap/bc/srt/scs/sap/managepurchaserequestin?sap-vhost=my350617.sapbydesign.com';
    const url = './soap-demo.wsdl'

    const security = new soap.BasicAuthSecurity('_TEST_USER', 'Welcome1');
    const wsdl_headers = {}, wsdl_options = {};
    security.addHeaders(wsdl_headers);
    security.addOptions(wsdl_options);

    const clientSoap = await soap.createClientAsync(url, { wsdl_headers, wsdl_options })
    // console.log(JSON.stringify(clientSoap.describe(), null, 2));

    // clientSoap.addSoapHeader({
    //     'x-auth': 'demoUser'
    // });

    // clientSoap.setSecurity(security);
    // clientSoap.setSecurity(new soap.BearerSecurity('token'));

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



