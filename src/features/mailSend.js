const transport = require("./mail")

const sendEmail = async (email, subject, text) => {
    transport.sendMail({
        from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
        to: email,
        subject: subject,
        text: text,        
    });    
}

module.exports = sendEmail;