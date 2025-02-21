const mailOptions = {
  from: 'hmlsmservice@gmail.com',
  to: 'hmlsmservice@gmail.com',
  subject: 'New Contact Form Submission - HMLS Mobile Mechanic',
  text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}
  `
}; 