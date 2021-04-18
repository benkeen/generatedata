const emailUtils = require('../utils/emailUtils');
const generalUtils = require('../utils/generalUtils');
const langUtils = require('../utils/langUtils');


const passwordReset = ({ firstName, tempPassword, i18n }) => {
	const emailIntroLineWithName = langUtils.getI18nString(i18n.emailIntroLineWithName, [firstName]);
	const adminEmail = emailUtils.getAdminEmail();
	const siteUrl = generalUtils.getSiteUrl();

	const text = `${emailIntroLineWithName}

${i18n.passwordResetEmailDesc} 

${emailLabel} ${email}
${passwordLabel} ${tempPassword}
${loginUrlLabel} ${siteUrl}

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
	<td width="140"><b>${emailLabel}</b></td>
	<td>${email}</td>
</tr>
<tr>
	<td><b>${passwordLabel}</b></td>
	<td>${tempPassword}</td>
</tr>
<tr>
	<td><b>${loginUrlLabel}</b></td>
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
