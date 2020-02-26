# oproxypac
Androidなどの細かいproxyの設定が可能でない環境向けの自動プロキシ設定ファイル配信用サーバを作るためのライブラリです.

## Install
```bash
npm install oproxypac
```

## Example
'http://localhost:8081/proxy.pac' でhttp通信のみlocal ipの8080で起動しているプロキシに転送する例
```js
const os = require("os");
const ProxyPacServer = require("oproxypac");

const IP = os.networkInterfaces().en0.find(x => x.family === "IPv4").address;
const PROXY_PORT = 8080;
const PORT = 8081;
const proxyPacServer = new ProxyPacServer(`${IP}:${PROXY_PORT}`);

proxyPacServer
    .protocol("http")
    .listen(PORT)
    .then(() => {
        console.info(`listen localhost:${PORT}`);
    });
```
