const sendEmail = require('./sendEmail');

sendEmail('destination email', 'Test subject', 'Test email body')
  .then(() => console.log('Email sent!'))
  .catch(err => console.error('Error:', err));