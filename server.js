const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Routes
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointment");
const verifyToken = require("./middleware/auth.middleware");

const environment = process.env.NODE_ENV

if(environment === 'testing') {
    mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  });
} else {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  });
}

const app = express()

require('dotenv').config()

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Cross Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api', authRoutes);
app.use('/api', verifyToken, appointmentRoutes);

const listen = app.listen(process.env.PORT, (req, res) => {
    console.log(`Started:::: ${environment} runnung on port ${process.env.PORT}`)
})

module.exports = app
module.exports.port = listen.address().port
