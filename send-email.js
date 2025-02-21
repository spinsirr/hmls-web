const sgMail = require('@sendgrid/mail');
const axios = require('axios');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const formData = JSON.parse(event.body);
    const recaptchaResponse = formData.recaptchaResponse;

    // Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaResponseData = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      {},
      {
        params: {
          secret: recaptchaSecret,
          response: recaptchaResponse,
        },
      }
    );

    if (!recaptchaResponseData.data.success) {
      console.warn("reCAPTCHA validation failed:", recaptchaResponseData.data);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "reCAPTCHA validation failed" }),
      };
    }

    // Setup SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const mailOptions = {
      from: 'hmlsmservice@gmail.com',
      to: 'hmlsmservice@gmail.com',
      subject: 'New Contact Form Submission - HMLS Mobile Mechanic',
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Message: ${formData.message}
      `
    };

    await sgMail.send(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
}; 