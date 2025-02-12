import nodemailer from 'nodemailer'


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
    from: '${process.env.HOLAWORLD_EMAIL}',
    to: recipient,
    subject: subject,
    html: htmlMessage
  };
  try {
    cPanel_transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    
  }
}

export {createHolaWorldMail}