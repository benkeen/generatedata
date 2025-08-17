export type AppType = 'login' | 'open' | 'closed' | 'prod';

export type GDLocale = 'ar' | 'de' | 'en' | 'es' | 'es' | 'fr' | 'hi' | 'ja' | 'nl' | 'pt' | 'ru' | 'ta' | 'zh';

export type GDLocaleMap = {
  [locale in GDLocale]: string;
};

export type GDClientConfig = {
  api: {
    GD_API_SERVER_PORT: number;
  };
  webServer: {
    GD_WEB_DOMAIN: string;
    GD_WEB_SERVER_PORT: number;
    GD_WEB_USE_HTTPS: boolean;
  };
  auth: {
    GD_JWT_LIFESPAN_MINS: number;
    GD_GOOGLE_AUTH_CLIENT_ID: string;
  };
  appSettings: {
    GD_APP_TYPE: AppType;
    GD_GENERATOR_PATH: string;
    GD_DEFAULT_LOCALE: GDLocale;
    GD_DEFAULT_EXPORT_TYPE: string;
    GD_LOCALES: GDLocale[];
    GD_DEFAULT_NUM_ROWS: number;
    GD_MAX_DEMO_MODE_ROWS: number;
    GD_MAX_DATASET_HISTORY_SIZE: number;
    GD_DATA_TYPE_BLACKLIST: string[];
    GD_EXPORT_TYPE_BLACKLIST: string[];
    GD_COUNTRY_BLACKLIST: string[];
    GD_IMPORT_FILES: string[];
  };
};

export type GDServerConfig = {
  email: {
    GD_EMAIL_OAUTH_SERVICE_CLIENT_ID: string;
    GD_EMAIL_OAUTH_PRIVATE_KEY: string;
  };
  auth: {
    GD_JWT_SECRET: string;
    GD_JWT_REFRESH_TOKEN_SECRET: string;
    GD_GOOGLE_AUTH_CLIENT_SECRET: string;
  };
  defaultAdminAccount: {
    GD_DEFAULT_ADMIN_FIRST_NAME: string;
    GD_DEFAULT_ADMIN_LAST_NAME: string;
    GD_DEFAULT_ADMIN_EMAIL_SENDER_NAME: string;
    GD_DEFAULT_ADMIN_EMAIL: string;
    GD_DEFAULT_ADMIN_PASSWORD: string;
  };
};
