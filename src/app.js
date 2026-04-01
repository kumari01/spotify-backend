const express= require('express');
const cookieParser = require('cookie-parser');
const authroutes = require('./Router/auth.router');
const musicRouter  = require('./Router/music.router');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authroutes);
app.use('/api/music',musicRouter);


module.exports = app ;
