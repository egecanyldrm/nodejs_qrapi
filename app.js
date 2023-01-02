const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
// const helmet = require("helmet");
// const rateLimit = require('express-rate-limit');

// app.use(cors({
//     origin: '*'
// }));

app.use(cors({
    origin: ['qrpanel.kreatifdestek.com', 'https://qrpanel.kreatifdestek.com', 'qr.kreatifdestek.com', 'https://qr.kreatifdestek.com']
}));




//Routes
const adminRoutes = require('./routes/admin');
const accountRoutes = require('./routes/account');
const customerRoutes = require('./routes/customer');
const ownerRoutes = require('./routes/owner');

// Error Page Controller
const errorPage = require('./controllers/errorPage')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


//Security

// app.use(helmet());
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.crossOriginEmbedderPolicy());
// app.use(helmet.crossOriginOpenerPolicy());
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.originAgentCluster());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// Apply the rate limiting middleware to all requests
// app.use(limiter)

//Parsers
app.use(express.urlencoded({ extended: true }))
app.use(multer({ storage: storage }).single('image'))
app.use(express.json());
//Resimleri Dışarıya Açıyoruz
app.use('/public', express.static(path.join(__dirname, '../', 'public')));

//Cros Origin For Development
// app.use(
//     cors({
//         origin: true,
//         optionsSuccessStatus: 200,
//         credentials: true,
//     })
// );
// app.options(
//     '*',
//     cors({
//         origin: true,
//         optionsSuccessStatus: 200,
//         credentials: true,
//     })
// );



//Routing Processing 
app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);
app.use('/owner', ownerRoutes);
app.use(accountRoutes)
app.use(errorPage.get404Page)




//Database Connection

const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('connected to mongodb');
        app.listen(port)
    }).catch(err => { console.log(err) })
