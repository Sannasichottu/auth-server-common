const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config({path:"config/config.env"})

app.use(express.json());
app.use(cookieParser())

const auth = require('./routes/auth')

app.use('/api/v1/',auth)




module.exports = app