const jwt = require('jsonwebtoken');

module.exports = {
  async forgotPassword(ctx) {
    try {
      const { email } = ctx.request.body;
      
      
      const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { email }
      });
      
      if (!user) {
        return ctx.notFound('Email not found');
      }
      
      
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || strapi.config.get('plugin.users-permissions.jwtSecret'),
        { expiresIn: '30m' }
      );
      

      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
      
      
      await strapi.services['api::email.email'].send({
        to: email,
        subject: "Motor Safari Account Password Reset Request",
        html: `
          <html>
            <body>
              <p>For Motor safari account ${user.username}, click this 
                <a href="${resetLink}">link</a> 
                to reset your password. This link expires in 30 minutes
              </p>
            </body>
          </html>
        `
      });
      
      return ctx.send({
        message: "Password reset email sent"
      });
      
    } catch (error) {
      console.error('Forgot password error:', error);
      return ctx.badRequest(`Error in forgot_password: ${error.message}`);
    }
  },
  
  async resetPassword(ctx) {
    try {
      const { token, newPassword } = ctx.request.body;
      
      if (!token || !newPassword) {
        return ctx.badRequest('Token and new password are required');
      }
      
      
      let decoded;
      try {
        decoded = jwt.verify(
          token, 
          process.env.JWT_SECRET || strapi.config.get('plugin.users-permissions.jwtSecret')
        );
        
        
        if (typeof decoded !== 'object' || !decoded || !decoded.id) {
          return ctx.badRequest('Invalid token format');
        }
      } catch (error) {
        return ctx.badRequest('Invalid or expired token');
      }
      
    
      const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: decoded.id }
      });
      
      if (!user) {
        return ctx.notFound('User not found');
      }
      
      
      try {
        
        await strapi
          .service('plugin::users-permissions.user')
          .edit(user.id, { password: newPassword });
        
        return ctx.send({
          msg: "Password reset successful"
        });
      } catch (error) {
        console.error('Failed to update password:', error);
        return ctx.badRequest('Error updating password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      return ctx.badRequest('Error resetting password');
    }
  }
};
