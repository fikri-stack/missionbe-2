const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'excelsimanjuntak6@gmail.com',
      subject: 'Test Email',
      text: 'kontol lu gede'
    });
    console.log('✅ Email sent successfully:', info.messageId);
  } catch (error) {
    console.log('❌ Email error:', error.message);
  }
}

testEmail();