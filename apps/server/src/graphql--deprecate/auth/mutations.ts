import { OAuth2Client } from 'google-auth-library';
import { nanoid } from 'nanoid';
import { db } from '../../database';
import { clientConfig } from '@generatedata/config';
import { RequestContext } from 'types/server';
import { MutationResolvers } from '@generatedata/graphql-schema';
import * as authUtils from '../../utils/authUtils';
import * as emailUtils from '../../utils/emailUtils';
import * as langUtils from '../../utils/langUtils';
import { getAccountNumRowsGenerated } from '../accounts/queries';
import { passwordReset, passwordResetAccountExpired } from '../../emails/index';

export const sendPasswordResetEmail: MutationResolvers['sendPasswordResetEmail'] = async (_root, { email }, { req }) => {
  const i18n = langUtils.getStrings(req.cookies.lang || 'en');

  const user = await db.accounts.findOne({
    attributes: ['accountId', 'firstName', 'expiryDate'],
    where: {
      email
    }
  });

  if (user) {
    // if the user's account has expired, let 'em know. Sodding ORM adds a degree of confusion but expiryDate is
    // actually a JS object
    const { firstName, expiryDate } = user.dataValues;

    const accountExpired = authUtils.accountExpired(expiryDate);
    if (accountExpired) {
      const { subject, text, html } = passwordResetAccountExpired({
        firstName,
        i18n
      });
      await emailUtils.sendEmail(email, subject, text, html);
    } else {
      const tempPassword = nanoid(14);
      const tempPasswordHash = await authUtils.getPasswordHash(tempPassword);

      // set this temporary password in the DB
      await user.update({
        oneTimePassword: tempPasswordHash
      });

      const { subject, text, html } = passwordReset({
        firstName,
        email,
        tempPassword,
        i18n
      });
      await emailUtils.sendEmail(email, subject, text, html);
    }
  }

  // regardless of whether it was found or not, just return true. This prevents people being sneaky and finding out
  // if people have an account or not
  return { success: true };
};

// this checks and updates the refresh token sent in a cookie
export const refreshToken: MutationResolvers['refreshToken'] = async (_root, _args, { req, res }) => {
  if (!req.cookies.refreshToken) {
    return { success: false };
  }

  const oldRefreshToken = req.cookies.refreshToken;
  const user = await db.accounts.findOne({
    attributes: ['accountId', 'accountType', 'firstName', 'email', 'lastName', 'country', 'region', 'dateCreated', 'expiryDate'],
    where: {
      refreshToken: oldRefreshToken
    }
  });

  if (!user) {
    return { success: false };
  }

  const { accountId, email } = user.dataValues;
  const { token: newToken, tokenExpiry, refreshToken } = await getNewTokens(accountId, email, user);

  const numRowsGenerated = await getAccountNumRowsGenerated(accountId);

  return {
    success: true,
    token: newToken,
    tokenExpiry,
    refreshToken,
    numRowsGenerated,
    ...user.dataValues
  };
};

export const logout: MutationResolvers['logout'] = async (_root, _args, { req }) => {
  if (!req.cookies.refreshToken) {
    return { success: true };
  }

  const refreshToken = req.cookies.refreshToken;
  const user = await db.accounts.findOne({
    attributes: ['accountId'],
    where: {
      refreshToken
    }
  });

  if (user) {
    user.update({
      refreshToken: null,
      oneTimePassword: null
    });
  }

  return { success: true };
};
