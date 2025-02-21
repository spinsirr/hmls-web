const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the contact.html file
const contactHtmlPath = path.join(__dirname, 'contact.html');
let contactHtml = fs.readFileSync(contactHtmlPath, 'utf8');

// Replace environment variables
contactHtml = contactHtml.replace(
  '<%= process.env.RECAPTCHA_SITE_KEY %>',
  process.env.RECAPTCHA_SITE_KEY
);

// Write the processed file
fs.writeFileSync(contactHtmlPath, contactHtml); 