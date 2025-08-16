import type { GDServerConfig } from '../typings';

const serverConfig: GDServerConfig = {
  auth: {
    // PLEASE UPDATE. JWT secret. This is used for the JWT generation code. It should be changed to any random string
    GD_JWT_SECRET: 'Change this string to anything you like.',

    // PLEASE UPDATE. Any random string is fine
    GD_JWT_REFRESH_TOKEN_SECRET: 'Also change this string to something else.',

    // (optional) Sign-in with Google settings for - oath2. This requires `GD_GOOGLE_AUTH_CLIENT_ID` to have been set in the
    // client.config.ts file
    GD_GOOGLE_AUTH_CLIENT_SECRET: ''
  },

  // (optional) this gives you the optional of tying in email functionality, to enable features like emailing for lost passwords,
  // registering and so on
  email: {
    GD_EMAIL_OAUTH_SERVICE_CLIENT_ID: '',
    GD_EMAIL_OAUTH_PRIVATE_KEY: ''
  },

  // You can either set these values before installing the app, or customize the values via the UI
  // afterwards. This information is only used during the initial setup of the application
  defaultAdminAccount: {
    GD_DEFAULT_ADMIN_FIRST_NAME: 'John',
    GD_DEFAULT_ADMIN_LAST_NAME: 'Smith',
    GD_DEFAULT_ADMIN_EMAIL_SENDER_NAME: 'YourSite',
    GD_DEFAULT_ADMIN_EMAIL: 'admin@youremail.net',
    GD_DEFAULT_ADMIN_PASSWORD: 'admin123'
  }
};

export default serverConfig;
