const emailUtils = require('../utils/emailUtils');
const generalUtils = require('../utils/generalUtils');
const langUtils = require('../utils/langUtils');

/**
 * Used when a user tries to reset their password but their account has already expired.
 */
const passwordResetAccountExpired = ({ firstName, i18n }) => {
	const emailIntroLineWithName = langUtils.getI18nString(i18n.emailIntroLineWithName, [firstName]);
	const adminEmail = emailUtils.getAdminEmail();
	const siteUrl = generalUtils.getSiteUrl();

	const text = `
${emailIntroLineWithName}

${i18n.passwordResetAccountExpiredDesc} 

${i18n.ifWantToReregister} 
${siteUrl}

${i18n.emailFooterDisclaimer}

- ${i18n.administrator}
${adminEmail}
	`;

	const html = '';
// `
// <!doctype html>
// <html>
// <body>
// <p>
// 	${emailIntroLineWithName},
// </p>
//
// <p>
// 	We just received a request to reset your password, however your account has already expired.
// </p>
//
// <p>
// 	If you'd like to re-register, please visit:<br />
// 	<a href="${url}">${url}</a>
// </p>
//
// <p>
// 	If you've received this email in error please reach out to the site administrator.
// </p>
//
// <p>
// 	<i>- Administrator</i><br />
// 	<a href="mailto:${adminEmail}">${adminEmail}</a>
// </p
//
// </p>
// </body>
// </html>`;

	return {
		subject: i18n.passwordResetAccountExpired,
		text,
		html
	};
};


module.exports = {
	passwordResetAccountExpired
};
