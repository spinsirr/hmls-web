const sgMail = require('@sendgrid/mail');
const axios = require('axios');

exports.handler = async (event) => {
  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return { 
        statusCode: 405, 
        body: JSON.stringify({ message: 'Method Not Allowed' })
      };
    }

    const formData = JSON.parse(event.body);
    const recaptchaResponse = formData.recaptchaResponse;

    // Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaVerification = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: recaptchaSecret,
          response: recaptchaResponse,
        },
      }
    );

    if (!recaptchaVerification.data.success) {
      console.error('reCAPTCHA verification failed:', recaptchaVerification.data);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'reCAPTCHA verification failed' })
      };
    }

    // Configure SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Prepare email content
    const emailContent = `
      New Contact Form Submission
      
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      VIN (if provided): ${formData.vin || 'Not provided'}
      
      Message:
      ${formData.message}
      
      Submitted on: ${new Date().toLocaleString()}
    `;

    const msg = {
      to: 'hmlsmservice@gmail.com',
      from: 'hmlsmservice@gmail.com', // Must be verified sender
      subject: 'New Contact Form Submission - HMLS Mobile Mechanic',
      text: emailContent,
      replyTo: formData.email
    };

    // Send email
    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };

  } catch (error) {
    console.error('Error processing request:', error);
    
    // Check for SendGrid specific errors
    if (error.response && error.response.body) {
      console.error('SendGrid Error:', error.response.body);
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error sending email',
        error: error.message 
      })
    };
  }
}; 