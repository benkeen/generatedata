import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';
import { getAccountNumRowsGenerated } from '../../../accounts/helpers';
import { getNewTokens } from '../../helpers';
import { OAuth2Client } from 'google-auth-library';

export const loginWithGoogle: NonNullable<MutationResolvers['loginWithGoogle']> = async (_parent, { googleToken }, _ctx) => {
  const client = new OAuth2Client(process.env.GD_GOOGLE_AUTH_CLIENT_ID);
  let email: string = '';
  let profileImage: string = '';

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GD_GOOGLE_AUTH_CLIENT_ID
    });
    const payload = ticket.getPayload();

    email = payload?.email || '';
    profileImage = payload?.picture || '';
  }

  try {
    await verify();
  } catch (e) {
    return {
      success: false
    };
  }

  // here the authentication has passed. Now verify the account exists
  const user = await db.accounts.findOne({
    attributes: [
      'accountId',
      'accountType',
      'password',
      'firstName',
      'lastName',
      'country',
      'region',
      'dateCreated',
      'expiryDate',
      'country',
      'region'
    ],
    where: {
      email
    }
  });

  if (!user) {
    return {
      success: false,
      error: 'noUserAccount'
    };
  }

  const { accountId, accountType, firstName, lastName, country, region, expiryDate, dateCreated } = user.dataValues;
  const accountExpired = authUtils.accountExpired(expiryDate);

  if (accountExpired) {
    return {
      success: false,
      error: 'accountExpired'
    };
  }

  const { token, tokenExpiry, refreshToken } = await getNewTokens(accountId, email, user);
  const numRowsGenerated = await getAccountNumRowsGenerated(accountId);

  return {
    success: true,
    token,
    tokenExpiry: tokenExpiry.toString(),
    refreshToken,
    firstName,
    lastName,
    email,
    country,
    region,
    accountType,
    expiryDate,
    dateCreated,
    numRowsGenerated,
    profileImage
  };
};
