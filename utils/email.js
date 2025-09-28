const nodemailer = require("nodemailer");

const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

exports.sendEmail = async (to , subject , text) =>{
    await transpoter.sendMail({
        from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    });
}