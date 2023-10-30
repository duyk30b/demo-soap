const express = require('express');
const soap = require('soap');
const fs = require('fs')

const sleep = async (time) => {
    await new Promise((resolve) => setTimeout(resolve, time))
}

var bookService = {
    BookService: {
        BookPort: {
            BookList: function (args, callback, headers, req) {
                console.log('🚀 ~ BookList ~ headers:', headers)
                console.log('🚀 ~ BookList ~ args:', args)
                return {
                    key: args.key,
                    status: "200",
                    message: "Success",
                    timeResponse: new Date().toISOString()
                };
            },

            BookCreate: async function (args, callback, headers) {
                console.log('🚀 ~~ BookCreate: ~ args:', args)
                console.log('🚀 ~~ BookCreate: ~ headers:', headers)
                await sleep(2000)
                callback({
                    key: args.key,
                    status: "200",
                    message: "Success",
                    timeResponse: new Date().toISOString()
                })
            },
        }
    }
};

var xml = fs.readFileSync('my-service.wsdl', 'utf8');
var app = express();

let server = null

app.listen(8001, function () {
    server = soap.listen(app, '/BookFunction', bookService, xml, function () {
        console.log('🚀 ~ Server SOAP initialized... http://localhost:8001/BookFunction?wsdl');
    });
    server.addSoapHeader(function (methodName, args, headers, req) {
        console.log('🚀 ~ server.addSoapHeader ~ headers:', headers)
        return {
            lang: 'vi',
        };
    });

    server.on('headers', function (headers, methodName) {
        console.log('🚀 ~ server.on header ~ methodName:', methodName)
        console.log('🚀 ~ server.on header ~ headers:', headers)
    })
    server.log = function (type, data) {
        // console.log('🚀 ~ server.js:64 ~ {type: data}:', { [type]: data })
    };
});
