// src/api/email/services/email.js
const nodemailer = require('nodemailer');

module.exports = {
  async send(options) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    const { from, to, subject, text, html, ...rest } = options;
    
    const msg = {
      from: from || 'ha.wakhule@gmail.com', 
      to,
      subject,
      text,
      html,
      ...rest,
    };
    
    
    //console.log('Attempting to send email to:', to);
    
    try {
      const info = await transporter.sendMail(msg);
     // console.log('Email sent successfully:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
};