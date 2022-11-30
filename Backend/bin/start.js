'use strict';

require('@babel/polyfill');
require('@babel/register');

const app=require('../app').default;
const http=require('http');
const port =4455;

const server=http.createServer(app);

server.listen(port);


server.on('listening',()=>{
    console.log(`listening on ${port}` );
});

