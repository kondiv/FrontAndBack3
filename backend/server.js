const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const FRONTEND_INDEX = path.join(__dirname, '../frontend/index.html');
const FRONTEND_CSS = path.join(__dirname, '../frontend/styles.css');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Отдаем HTML-страницу
        fs.readFile(FRONTEND_INDEX, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/styles.css' && req.method === 'GET') {
        // Отдаем CSS-файл
        fs.readFile(FRONTEND_CSS, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (req.url === '/products' && req.method === 'GET') {
        // Отдаем данные о товарах
        fs.readFile(PRODUCTS_FILE, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});