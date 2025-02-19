import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

let cPanel_transporter = nodemailer.createTransport({
    host:'mail.holaworld.biz',
    port: 465,
    secure: true,
    auth: {
        user: process.env.HOLAWORLD_EMAIL,
        pass: process.env.HOLAWORLD_EMAIL_PASSWORD

    }
    
  });


function createHolaWorldMail(recipient, subject, htmlMessage ) {
  let mailOptions = {
    from: process.env.HOLAWORLD_EMAIL,
    to: recipient,
    subject: subject,
    html: htmlMessage
  };
  console.log("mailOptions", mailOptions);
  try {
    cPanel_transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.log("cpanel email erro\n", error);
  }
}

export {createHolaWorldMail}