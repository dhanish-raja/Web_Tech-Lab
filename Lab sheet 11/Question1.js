const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Powered-By', 'Node.js HTTP Module');

    if (req.url === '/' || req.url === '/home') {
        res.writeHead(200);
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Node.js Simple Server</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f4f8; }
                    h1 { color: #2563eb; }
                    p { color: #555; font-size: 18px; }
                    .info { margin-top: 30px; font-size: 14px; color: #666; }
                </style>
            </head>
            <body>
                <h1>✅ Welcome to My Node.js Server!</h1>
                <p>This server is built using only the built-in <strong>http</strong> module.</p>
                <p>No Express, No Koa, No external frameworks.</p>
                
                <div class="info">
                    <p><strong>Request URL:</strong> ${req.url}</p>
                    <p><strong>Method:</strong> ${req.method}</p>
                    <p><strong>Server Time:</strong> ${new Date().toLocaleString()}</p>
                </div>
            </body>
            </html>
        `);
        res.end();
    } 
    else if (req.url === '/about') {
        res.writeHead(200);
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>About - Node.js Server</title>
            </head>
            <body style="font-family: Arial; text-align: center; padding: 50px;">
                <h1>About This Server</h1>
                <p>This is a demonstration of Node.js core HTTP module.</p>
                <p>It handles requests and sends responses without any framework.</p>
            </body>
            </html>
        `);
        res.end();
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>404 - Page Not Found</title>
            </head>
            <body style="font-family: Arial; text-align: center; padding: 80px;">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <p><a href="/">Go Back Home</a></p>
            </body>
            </html>
        `);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`📌 Press Ctrl + C to stop the server`);
});

server.on('error', (err) => {
    console.error('Server Error:', err.message);
});
