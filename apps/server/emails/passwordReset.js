const emailUtils = require('../utils/emailUtils');
const generalUtils = require('../utils/generalUtils');
const langUtils = require('../utils/langUtils');


const passwordReset = ({ firstName, email, tempPassword, i18n }) => {
	const emailIntroLineWithName = langUtils.getI18nString(i18n.emailIntroLineWithName, [firstName]);
	const adminEmail = emailUtils.getAdminEmail();
	const siteUrl = generalUtils.getSiteUrl();

	const text = `${emailIntroLineWithName}

${i18n.passwordResetEmailDesc} 

${i18n.emailLabel} ${email}
${i18n.passwordLabel} ${tempPassword}
${i18n.loginUrlLabel} ${siteUrl}

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
<p>${i18n.passwordResetEmailDesc}</p>

<table>
<tr>
	<td width="140"><b>${i18n.emailLabel}</b></td>
	<td>${email}</td>
</tr>
<tr>
	<td><b>${i18n.passwordLabel}</b></td>
	<td>${tempPassword}</td>
</tr>
<tr>
	<td><b>${i18n.loginUrlLabel}</b></td>
	<td><a href="${siteUrl}">${siteUrl}</a></td>
</tr>
</table>
</p>

<p>${i18n.emailFooterDisclaimer}</p>

<p>
	<i>- ${i18n.administrator}</i><br />
	<a href="mailto:${adminEmail}">${adminEmail}</a>
</p>
</body>
</html>`;

	return {
		subject: i18n.passwordReset,
		text,
		html
	};
};

module.exports = {
	passwordReset
};
