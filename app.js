var express=require('express')
var app=express();
var nodemailer = require("nodemailer");
var ejs=require('ejs')
app.set('view engine','ejs')
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'your email',
        pass: 'your password'
    }
});

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/send',()=>{

    ejs.renderFile(__dirname + "/views/email.ejs", { name: 'Stranger' }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: 'anjuboura.2017@gmail.com',
                to: "nehaboura@gmail.com",
                subject: 'Hello, world',
                html: data
            };
            console.log("html data ======================>", mainOptions.html);
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
        
        });
    
})



app.listen(3030,(error)=>{
    console.log('server is listening at port 3030')
})