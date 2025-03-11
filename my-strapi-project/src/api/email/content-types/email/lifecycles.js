// src/api/email/content-types/email/lifecycles.js
module.exports = {
  async afterCreate(event) {
    const { result } = event;
    
    try {
      
      //console.log('New email entry created:', result);
      //console.log('Recipient:', result.to);
      
      // Send the email
      await strapi.services['api::email.email'].send({
        to: result.to,
        subject: result.subject,
        text: result.text,
        html: result.html || `<p>${result.text}</p>`
      });
      
      console.log('Notification email sent successfully');
    } catch (error) {
      console.error('Failed to send notification email:', error);
    }
  }
};