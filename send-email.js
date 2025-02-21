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