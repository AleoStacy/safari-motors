module.exports = {
    async send(ctx) {
      try {
        const { to, subject, text, html } = ctx.request.body;
        
        await strapi.plugins.email.services.email.send({
          to,
          subject,
          text,
          html,
        });
        
        return ctx.send({
          success: true,
          message: 'Email sent successfully'
        });
      } catch (err) {
        return ctx.badRequest(null, err.message);
      }
    }
  };