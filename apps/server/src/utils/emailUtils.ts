import nodemailer from 'nodemailer';
import { serverConfig } from '@generatedata/config';

export const sendEmail = async (recipientEmail: string, subject: string, textContent: string, htmlContent: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: getAdminEmail(),
      serviceClient: process.env.GD_EMAIL_OAUTH_SERVICE_CLIENT_ID,
      privateKey: serverConfig.email.GD_EMAIL_OAUTH_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: getEmailSender(),
      to: recipientEmail,
      subject,
      text: textContent,
      html: htmlContent
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAdminEmail = () => {
  return process.env.GD_DEFAULT_ADMIN_EMAIL;
};

export const getEmailSender = () => {
  return `${process.env.GD_DEFAULT_ADMIN_EMAIL_SENDER_NAME} <${process.env.GD_DEFAULT_ADMIN_EMAIL}>`;
};
