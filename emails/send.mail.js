const nodemailer = require('nodemailer');
const Email = require('email-templates');

require('dotenv').config()

const sendMail = async (template, to, name, start) => {


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        priority: 'high',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        }
    });

    const email = new Email({ message: { from: process.env.MAIL_USERNAME }, transport: transporter });

    try {

        const send = await email.send({
            template: template,
            message: { to: to},
            locals: { name: name, date: start }
        })
        console.log("email sent successfully")

    } catch (err) { console.error(err) }
}

module.exports = sendMail
