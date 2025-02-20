const mailOptions = {
  from: 'info@hmlsmobilemechanic.com',
  to: 'info@hmlsmobilemechanic.com',
  subject: 'New Contact Form Submission - HMLS Mobile Mechanic',
  text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}
  `
}; 