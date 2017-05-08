import express from 'express'
import { resolve } from 'path'
import fallback from 'express-history-api-fallback';
import config from '../config'

const root = resolve(process.cwd(), config.get('STATIC_PATH'));
const app = express()
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const pg = require('pg');
const json = require('body-parser').json;
const cookieParser = require('cookie-parser');

const apiRouter = new express.Router();
const authRouter = new express.Router();

const pgConfig = {
  user: 'warrenchan',
  password: 'keys',
  database: 'reditscratch',
  port: 5432,
  host: 'localhost',
};

const pool = new pg.Pool(pgConfig);

const apiRoutes = require('./routes/api.js')
// const authRoutes = require('./routes/auth')

app.use(cors());
app.use(json());
// app.use(cookieParser());

app.use('/api', apiRoutes(apiRouter))
// app.use('/auth', authRoutes(authRouter))

app.use(fallback('index.html', { root }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req, res, next) => {
  res.status(404).send('Page not found...');
  next();
});

module.exports = {
    app, pool
};

