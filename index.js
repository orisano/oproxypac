"use strict";

const http = require("http");

class ProxyPacServer {
    constructor(proxyUrl) {
        this.proxyUrl = proxyUrl;
        this.protocols = [];
    }
    protocol(scheme, proxy) {
        proxy = proxy || this.proxyUrl;
        this.protocols.push({scheme, proxy});
        return this;
    }
    listen(port) {
        const server = http.createServer((req, res) => {
            if (req.url !== "/proxy.pac") {
                res.writeHead(404);
                res.end();
                return;
            }
            res.writeHead(200, {
                "Content-Type": "application/x-ns-proxy-autoconfig"
            });
            const body = [
                "function FindProxyForURL(url, host) {",
                this.protocols.map(x => `    if (shExpMatch(url, "${x.scheme}://*")) return "PROXY ${x.proxy}";`).join("\n"),
                '    return "DIRECT";',
                "}",
            ].join("\n");
            res.end(body);
        });
        return new Promise((resolve, reject) => {
            server.listen(port, resolve);
        });
    }
}

module.exports = ProxyPacServer;
