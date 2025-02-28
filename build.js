const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the contact.html file
const contactHtmlPath = path.join(__dirname, 'contact.html');
let contactHtml = fs.readFileSync(contactHtmlPath, 'utf8');

// Write the processed file
fs.writeFileSync(contactHtmlPath, contactHtml); 