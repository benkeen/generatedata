const emailUtils = require('../src/utils/emailUtils');
const generalUtils = require('../src/utils/generalUtils');
const langUtils = require('../src/utils/langUtils');

/**
 * Used when a user tries to reset their password but their account has already expired.
 */
const passwordResetAccountExpired = ({ firstName, i18n }) => {
  const emailIntroLineWithName = langUtils.getI18nString(i18n.emailIntroLineWithName, [firstName]);
  const adminEmail = emailUtils.getAdminEmail();
  const siteUrl = generalUtils.getSiteUrl();

  const text = `${emailIntroLineWithName}

${i18n.passwordResetAccountExpiredDesc}

${i18n.ifWantToReregister} 
${siteUrl}

${i18n.emailFooterDisclaimer}

- ${i18n.administrator}
${adminEmail}
	`;

  const html = `<!doctype html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
<p>${emailIntroLineWithName}</p>
<p>${i18n.passwordResetAccountExpiredDesc}</p>
<p>
	${i18n.ifWantToReregister}<br />
	<a href="${siteUrl}">${siteUrl}</a>
</p>

<p>${i18n.emailFooterDisclaimer}</p>

<p>
	<i>- ${i18n.administrator}</i><br />
	<a href="mailto:${adminEmail}">${adminEmail}</a>
</p>
</body>
</html>`;

  return {
    subject: i18n.passwordResetAccountExpired,
    text,
    html
  };
};

module.exports = {
  passwordResetAccountExpired
};
