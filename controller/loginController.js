const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
require('dotenv').config()
var nodemailer = require('nodemailer');

const Credentials = require("../model/model")

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.signUpController = async (req, res) => {

    var { userName, passWord, email } = req.body
    userName = userName.toLowerCase()
    email = email.toLowerCase()
    passWord = await bcrypt.hash(passWord, 10);

    Credentials.findOne({ $or: [{ userName: userName }, { email: email }] }).then(async (result) => {
        if (result) {
            if (userName == result.userName) {
                res.send({ success: false, message: "User already exist" })
            } else if (email == result.email) {
                res.send({ success: false, message: "Email already exist" })
            }
        }
        else {
            Credentials.create({ userName: userName, passWord: passWord, email: email,type:"admin" }).then((result) => {
                res.send({ success: true, data: result })
            }).catch((error) => {
                res.send({ success: false, message: error.message })
            })
        }
    }).catch((err) => {
        res.send({ success: false, message: err.message })
    })
}

exports.loginController = async (req, res) => {

    var { userName, passWord } = req.body
    userName = userName.toLowerCase()
    Credentials.findOne({ $or: [{ userName: userName }, { email: userName }],status:true }).then(async (result) => {
        if (result) {
            var token = jwt.sign({ userName: result.userName, id: result._id, email: result.email }, process.env.privatekey);
            var validPassword = await bcrypt.compare(passWord, result.passWord);
            if (validPassword) {
                res.send({ success: true, message: "Login successfully", token: token, userData: result});
            } else {
                res.send({ success: false, message: "Invalid Password" });
            }
        } else {
            res.send({ success: false, message: "user not found" })
        }
    }).catch((error) => {
        res.send({ err: error.message })
    })

}

exports.forgetController = async (req, res) => {

    var { email } = req.body
    email = email.toLowerCase()

    Credentials.findOne({ email: email }).then(async (result) => {

        if (result) {
            var token = jwt.sign({ id: result._id }, process.env.privatekey, { expiresIn: 60 * 600 });
            const mailOptions = {
                from: 'sender@gmail.com', // Sender address
                to: 'receiver@gmail.com', // List of recipients
                subject: 'Node Mailer', // Subject line
                html: `<a href=http://localhost:3000/reset/${token}>Click this Link to reset PASSWORD</a>`
            };

            transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err)
                }
            });

            res.send({ success: true, message: "Cheak your email" })
        } else {
            res.send({ success: false, message: "No user found with this emailid" })
        }

    }).catch((error) => {
        res.send({ err: error.message })
    })
}
exports.resetController = async (req, res) => {

    var { passWord } = req.body
    // passWord = await bcrypt.hash(passWord, 10);
    let { token } = req.headers

    jwt.verify(token, process.env.privatekey, async function (err, decoded) {
        if (err) {
            res.send({ success: false, message: "Link is expired" })
            /*
              err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
              }
            */
        } else {

            let passWord1 = await bcrypt.hash(passWord, 10);
            Credentials.findOneAndUpdate({ _id: decoded.id }, { passWord: passWord1 }).then(async credentaials => {

            }).then((result) => {
                res.send({ success: true, message: "Password updated " })
            }).catch((error) => {
                res.send({ success: false, message: "process failed,Try again" })
            })
        }
    });



    // Credentials.findOne(req.params.id)
    //     .then(credentials => {
    //         credentials.passWord = req.body.passWord,

    //             credentials.save()
    //                 .then(() => res.send({ success: true, message: 'Password updated!' }))
    //                 .catch(err => res.send({ success: false, message: "process failed" }))
    //     })
    //     .catch(err => res.status(400).json('Error: ' + err));


}