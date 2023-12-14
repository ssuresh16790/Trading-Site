const express = require('express');
const app = express();
const env = require('dotenv').config();
const router = require('./Routes/routes');
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");


app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



app.use('/', router);
const PORT = 5000

app.listen(PORT, () => {
   return console.log('Server Listening');
})

