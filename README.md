# basic-auth
learn express cookie and session 


## server.js文件
获取请求头中的经过base64编码 authorization 获取用户名密码，格式：授权类型 用户名：密码 (Basic admin:admin(base64加密));


## server-2.js 文件
使用 cookie-parser 中间件
登陆后设置 signedCookie (即加密cookie) 加密用户名。二次登陆获取请求头cookie ，使用req.signedCookies.user 解密user。验证登陆。


## server-3.js
使用 express-session, session-file-store 中间件
首先使用session中间件并设置参数(name-id, secret, saveUninitializaed,resave, store)，使用session-file-store 存储session 默认存储于./sessions/
登陆后设置设置req.session.user。二次登陆会解密设置于客户端cookie中的session 获取用户名，验证登陆
