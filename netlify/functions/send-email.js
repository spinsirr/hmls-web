const nodemailer = require('nodemailer');
const axios = require('axios');

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event, context) => {
  // Set security headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Frame-Options': 'SAMEORIGIN'
  };

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: 'Method Not Allowed' 
    };
  }

  const data = JSON.parse(event.body);
  const { name, email, phone, vin, message } = data;

  // Validate required fields
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Please fill in all required fields' })
    };
  }

  // Prepare email content
  const mailOptions = {
    from: process.env.SMTP_USER, // Use authenticated sender email
    to: process.env.SMTP_TO_EMAIL,
    replyTo: email,
    subject: 'New Contact Form Submission - HMLS Mobile Mechanic',
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
VIN: ${vin || 'Not provided'}

Message:
${message}
    `,
    html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
<p><strong>VIN:</strong> ${vin || 'Not provided'}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  // Send email
  await transporter.sendMail(mailOptions);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: 'Email sent successfully' })
  };
};
