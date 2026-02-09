import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';
import * as emailUtils from '../../../../utils/emailUtils';
import { nanoid } from 'nanoid';
import { passwordReset, passwordResetAccountExpired } from '../../../../emails';
import * as langUtils from '../../../../utils/langUtils';

export const sendPasswordResetEmail: NonNullable<MutationResolvers['sendPasswordResetEmail']> = async (_parent, { email }, { req }) => {
  const i18n = langUtils.getStrings(req.cookies.lang || 'en');

  const user = await db.accounts.findOne({
    attributes: ['accountId', 'firstName', 'expiryDate'],
    where: {
      email
    }
  });

  if (user) {
    // if the user's account has expired, let 'em know. The expiryDate is actually a JS object
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
