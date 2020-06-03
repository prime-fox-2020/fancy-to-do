const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const routes = require('./routes')

//Middleware
const errHandling = require('./middlewares/error')

const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use('/', routes)
app.use(errHandling)

app.listen(port, ()=>{
    console.log('This apps is running at port : ', port)
})

// var nodemailer = require('nodemailer');

    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     secure: false,
    //     port: 25,
    //     auth: {
    //         user: 'john@gmail.com',
    //         pass: '1234'
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });

    // let HelperOptions = {
    //     from: '"John" <john@gmail.com',
    //     to: 'jack@gmail.com',
    //     subject: 'dd',
    //     text: 'dd'
    // };

    // transporter.sendMail(HelperOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log("The message was sent!");
    //     console.log(info);
    // });

module.exports = app