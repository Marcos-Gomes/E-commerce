const transport = require("./mail")

const purchaseConfirm = async (email) => {
    transport.sendMail({
        from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
        to: email,
        subject: 'Pedido gerado com sucesso',
        text: 'Pedido gerado com sucesso',
        html: '<strong>Notificamos que seu pedido foi gerado.</strong>',
    });    
}

module.exports = purchaseConfirm;