const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error')
dotenv.config({path:"config/config.env"})

app.use(cors())
app.use(express.json());
app.use(cookieParser())

const auth = require('./routes/auth')

app.use('/api/v1/',auth)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client-ecom/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client-ecom/build/index.html"));
    });
  }

  app.use(errorMiddleware);  



module.exports = app