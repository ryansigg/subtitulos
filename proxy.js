#!/usr/bin/env node
// Simple proxy for OpenSubtitles API.
// Adds required User-Agent and Api-Key headers (browsers can't set User-Agent).
// Set your app API key: OPENSUBTITLES_API_KEY=yourkey node proxy.js [port]
// Users authenticate with their own OpenSubtitles account (username + password).

const http  = require('http');
const https = require('https');

const PORT       = process.argv[2] || 3000;
const API_BASE   = 'api.opensubtitles.com';
const USER_AGENT = 'Subtitulos v1.0';
const API_KEY    = process.env.OPENSUBTITLES_API_KEY || '';

const server = http.createServer((req, res) => {
  // CORS — allow the local HTML file to call us
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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
      'api-key':      API_KEY,
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
