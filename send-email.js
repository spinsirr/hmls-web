const sgMail = require('@sendgrid/mail');
const axios = require('axios');

// Validation functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^\d{10}$/;
  return re.test(phone.replace(/\D/g, ''));
};

const validateVin = (vin) => {
  if (!vin) return true; // VIN is optional
  const re = /^[A-HJ-NPR-Z0-9]{17}$/;
  return re.test(vin);
};

exports.handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  try {
    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ message: 'Method Not Allowed' })
      };
    }

    // Parse and validate request body
    let formData;
    try {
      formData = JSON.parse(event.body);
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid request format' })
      };
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid email format' })
      };
    }

    // Validate phone format
    if (!validatePhone(formData.phone)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid phone number format' })
      };
    }

    // Validate VIN if provided
    if (formData.vin && !validateVin(formData.vin)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid VIN format' })
      };
    }

    // Verify reCAPTCHA
    if (!formData.recaptchaResponse) {
      console.error('No reCAPTCHA response provided');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'reCAPTCHA verification required' })
      };
    }

    // Verify reCAPTCHA with Google
    const recaptchaVerification = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: formData.recaptchaResponse
        }
      }
    );

    if (!recaptchaVerification.data.success) {
      console.error('reCAPTCHA verification failed:', recaptchaVerification.data);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'reCAPTCHA verification failed' })
      };
    }

    // Check SendGrid configuration
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Email service not configured' })
      };
    }

    // Configure SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Format email content
    const emailContent = `
New Contact Form Submission

Customer Information:
-------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
VIN: ${formData.vin || 'Not provided'}

Message:
--------
${formData.message}

Submission Details:
-----------------
Date: ${new Date().toLocaleString()}
IP Address: ${event.headers['client-ip'] || 'Not available'}
User Agent: ${event.headers['user-agent'] || 'Not available'}
    `;

    // Prepare email message
    const msg = {
      to: 'hmlsmservice@gmail.com',
      from: {
        email: 'hmlsmservice@gmail.com',
        name: 'HMLS Mobile Mechanic'
      },
      subject: 'New Contact Form Submission - HMLS Mobile Mechanic',
      text: emailContent,
      replyTo: formData.email
    };

    // Send email
    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Email sent successfully' })
      };
    } catch (error) {
      console.error('SendGrid error:', error);
      if (error.response) {
        console.error('SendGrid error details:', error.response.body);
      }
      throw error; // Let the catch block handle it
    }

  } catch (error) {
    console.error('Server error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Failed to process request',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      })
    };
  }
}; 