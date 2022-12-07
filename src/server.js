import https from 'https'
import app from './app.js'
import * as fs from 'fs';
// import * as gg from '../config'


https
  .createServer({
    key: fs.readFileSync("localhost-key.pem"),
    cert: fs.readFileSync("localhost.pem"),
  },app)
  .listen(3001, () => console.log('Backend running'));