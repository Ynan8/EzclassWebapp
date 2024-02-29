const express = require("express");
const cors = require('cors');

const { readdirSync } = require('fs');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const { createServer } = require ('http');
const morgan = require('morgan');
const  connectDB  = require("./config/db");
require('dotenv').config();
const csrfProtection = csrf({ cookie: true })

const http = require('http')

    


//express
const app = express();
const httpServer = require('http').createServer(app);



connectDB()


// middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan('dev'));

// route
readdirSync("./routes")
    .map((r) => app.use("/api", require(`./routes/${r}`)));





// port
const port = process.env.PORT || 8000;

async function startServer() {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
startServer();