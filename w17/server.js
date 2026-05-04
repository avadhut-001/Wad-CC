const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const server = http.createServer((req,res)=> {

    if(req.url === '/api/emp'){
        fs.readFile('emp.json', 'utf-8', (err,data)=>{
            if(err){
                res.writeHead(500);
                res.end("Error in file");
            }
            else{
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(data);
            }
        })
    }
    else if(req.url === '/'){
        fs.readFile('index.html', (err,data)=>{
            res.writeHead('200');
            res.end(data);
        })
    }
    else{
        res.writeHead(400);
        res.end("Data Not Found");
    }
})

server.listen(PORT, ()=>{console.log("Server Running at 3000")});