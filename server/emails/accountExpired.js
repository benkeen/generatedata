

/**
 * Used when a user tries to reset their password but their account has already expired.
 */
const passwordResetAccountExpired = ({ firstName, i18n }) => {
	const text = `
Hi ${firstName},

We just received a request to reset your password. However, your account has already expired. 

If you'd like to re-register, please visit: 
${url}
	`;

	const html = `
<!doctype html>
<html>
<body>
<p>
	Hi ${firstName},
</p>

<p>
	We just received a request to reset your password. However, your account has already expired.
</p> 

<p>
	If you'd like to re-register, please visit:<br /> 
	<a href="${url}">${url}</a>
</p>

</body>
</html>`;

	return {
		subject: '',
		text,
		html
	};
};


module.exports = {
	passwordResetAccountExpired
};
