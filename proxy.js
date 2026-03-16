#!/usr/bin/env node
// Simple proxy for OpenSubtitles API.
// Adds required User-Agent header (browsers can't set it).
// Usage: node proxy.js [port]

const http  = require('http');
const https = require('https');

const PORT       = process.argv[2] || 3000;
const API_BASE   = 'api.opensubtitles.com';
const USER_AGENT = 'Subtitulos v1.0';

const server = http.createServer((req, res) => {
  // CORS — allow the local HTML file to call us
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Api-Key, Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // Only proxy /api/v1/* paths
  if (!req.url.startsWith('/api/v1/')) {
    res.writeHead(404); res.end('Not found'); return;
  }

  const options = {
    hostname: API_BASE,
    path:     req.url,
    method:   req.method,
    headers: {
      ...req.headers,
      host:           API_BASE,
      'user-agent':   USER_AGENT,
    },
  };

  const proxy = https.request(options, (apiRes) => {
    res.writeHead(apiRes.statusCode, apiRes.headers);
    apiRes.pipe(res);
  });

  proxy.on('error', (e) => {
    console.error('Proxy error:', e.message);
    res.writeHead(502); res.end('Proxy error');
  });

  req.pipe(proxy);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Subtitulos proxy running at http://127.0.0.1:${PORT}`);
});
