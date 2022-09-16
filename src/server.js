import https from 'https'
import app from './app.js'
import * as fs from 'fs';


https
  .createServer({
    key: fs.readFileSync("localhost-key.pem"),
    cert: fs.readFileSync("localhost.pem"),
  },app)
  .listen(3001);