module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/auth/forgot-password',
        handler: 'password-reset.forgotPassword',
        config: {
          auth: false,
          middlewares: [],
        }
      },
      {
        method: 'POST',
        path: '/auth/reset-password',
        handler: 'password-reset.resetPassword',
        config: {
          auth: false,
          middlewares: [],
        }
      }
    ]
  };