const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
);

function triggerAlert(message) {
    client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        to: '+233XXXXXXXXX'
    })
    .then(msg => console.log("SMS sent:", msg.sid))
    .catch(err => console.error(err));
}

module.exports = { triggerAlert };