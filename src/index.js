const express = require('express')
const app = express()
const fs = require('fs');

const apiRouter = new express.Router();
const authRouter = new express.Router();

const apiRoutes = require('./routes/api')
const authRoutes = require('./routes/auth')

app.use('/api',function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api', apiRoutes(apiRouter))
app.use('/auth', authRoutes(authRouter))

app.listen(3005, function () {
  console.log('Example app listening on port 3005!')
})
