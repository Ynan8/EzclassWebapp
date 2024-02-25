const express = require("express");
const { readdirSync } = require('fs');

const cors = require('cors');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const  connectDB  = require("./config/db");
require('dotenv').config();
const csrfProtection = csrf({ cookie: true })





//express
const app = express();


connectDB()


// middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan('dev'));

// route
readdirSync("./routes")
    .map((r) => app.use("/api", require(`./routes/${r}`)));


// csrf
app.use(csrfProtection)
app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});


// port
const port = process.env.PORT || 8000;

async function startServer() {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
startServer();