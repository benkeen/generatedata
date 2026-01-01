export const getSiteUrl = () => {
  let protocol = 'http';
  const domain = process.env.GD_WEB_DOMAIN;

  if (process.env.GD_WEB_USE_HTTPS === 'true') {
    protocol = 'https';
  }

  // @ts-ignore-line
  let cleanPort = '';
  let port = process.env.GD_WEB_SERVER_PORT.trim();
  if (port && port !== '80' && port !== 80 && port !== '443' && port !== 443) {
    cleanPort = `:${port}`;
  }

  return `${protocol}://${domain}${cleanPort}`;
};
