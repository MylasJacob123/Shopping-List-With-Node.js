const http = require("http");
const url = require("url");
const controller = require("./controller.js");

module.exports = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const pathSegments = reqUrl.pathname.split("/");
    const id = parseInt(pathSegments[pathSegments.length - 1], 10);

    if (reqUrl.pathname === "/items" && req.method === "GET") {
        console.log(`Request: ${req.method} ${reqUrl.pathname}`);
        controller.getItems(req, res);

    } else if (reqUrl.pathname === "/item" && req.method === "POST") {
        console.log(`Request: ${req.method} ${reqUrl.pathname}`);
        controller.createItem(req, res);

    } else if (reqUrl.pathname.startsWith("/shopping-list/") && req.method === "PUT") {
        console.log(`Request: ${req.method} ${reqUrl.pathname}`);
        req.params = { id }; 
        controller.updateItem(req, res);

    } else if (reqUrl.pathname.startsWith("/shopping-list/") && req.method === "DELETE") {
        console.log(`Request: ${req.method} ${reqUrl.pathname}`);
        req.params = { id }; 
        controller.deleteItem(req, res);

    } else {
        console.log(`Request: ${req.method} ${reqUrl.pathname}`);
        controller.invalidUrl(req, res);
    }
});
