const nodemailer = require('nodemailer');
const nodeMailer = require('nodemailer')
const userService = require('./user-service')


class SendMailService{
    constructor(){
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    async SendMail(from, to, subject, text){
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: subject,
                text: `From: ${from}\n\n${text}`,
                replyTo: from
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new SendMailService();