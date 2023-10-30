const express = require('express');
const soap = require('soap');
const fs = require('fs')

var myService = {
    MyService: {
        MyPort: {
            MyFunction: function (args) {
                console.log("MyFunction: args: ", args)
                return {
                    status: "200",
                    message: "Success",
                    timestamp: new Date().toISOString()
                };
            },

            MyPromiseFunction: function (args) {
                console.log("MyPromiseFunction: args: ", args)
                return new Promise((resolve) => {
                    resolve({
                        status: "200",
                        message: "Success",
                        timestamp: new Date()
                    });
                });
            },


            HeadersAwareFunction: function (args, cb, headers) {
                console.log('🚀 ~ ~ headers:', headers)
                console.log('🚀 ~ ~ args:', args)
                return {
                    name: headers.Token
                };
            },
        }
    }
};

var xml = fs.readFileSync('my-service.wsdl', 'utf8');
var app = express();

let server = null


app.listen(8001, function () {
    server = soap.listen(app, '/MyFunction', myService, xml, function () {
        console.log('🚀 ~ Server SOAP initialized... http://localhost:8001/MyFunction?wsdl');
    });

    server.on('headers', function (headers, methodName) {
        console.log('🚀 ~ file: server.js:30 ~ methodName:', methodName)
        console.log('🚀 ~ file: server.js:32 ~ headers:', headers)
    })
});
