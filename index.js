const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const PORT = process.env.PORT || 5000;

http
  .createServer(async (req, res) => {
    try {
      const filePath = path.join(
        __dirname,
        'public',
        (req.url === '/' ? 'index' : req.url) + '.html'
      );
      const data = await fs.readFile(filePath, 'utf-8');
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.end(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        const filePath = path.join(__dirname, 'public', '404.html');
        const data = await fs.readFile(filePath, 'utf-8');
        res.writeHead(200, {
          'Content-Type': 'text/html',
        });
        res.end(data);
      }
    }
  })
  .listen(PORT, () => console.log(`Server running on port ${PORT}`));
