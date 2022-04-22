const http = require("http");
const fs = require("fs");
const url = require("url");
const os = require("os");

http.createServer((req,res)=>{
    let urlPath = url.parse(req.url).pathname;
    let filePath = "./pages"+urlPath+".html";
    let userOsFile = "osinfo.json";
    // creating baby routine
    if(urlPath == "/"){
        fs.readFile("./pages/index.html",(err,data)=>{
            res.writeHead(200,{"content-type":"text/html"});
            res.write(data);
            return res.end();
        });
    }else if (urlPath == "/about") {
        fs.readFile(filePath,(err,data)=>{
            res.writeHead(200,{"content-type":"text/html"});
            res.write(data);
            return res.end();
        });
    }else if (urlPath == "/sys"){
        let osRequire = {
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            numberOfCPUS: os.cpus(),
            networkInterfaces: os.networkInterfaces(),
            uptime: os.uptime()
        }
        let userOs = JSON.stringify(osRequire);
        fs.appendFile(userOsFile,userOs,(err)=>{
            if (err) {
                return res.end(err);
            }
        });
        res.writeHead(201,{"content-type":"text/html"});
            res.write("Your OS info has been saved successfully!");
            return res.end();
    }else{
        fs.readFile("./pages/404.html",(err,data)=>{
            res.writeHead(404,{"content-type":"text/html"});
            res.write(data);
            return res.end();
        });
    }
}).listen(3000);