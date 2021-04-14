const nodemailer = require('nodemailer');

const sendEmail = async (recipientEmail, subject, content) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: process.env.GD_EMAIL_ADMIN_ACCOUNT,
			serviceClient: process.env.GD_EMAIL_OAUTH_SERVICE_CLIENT_ID,
			privateKey: process.env.GD_EMAIL_OAUTH_PRIVATE_KEY
		},
	});

	try {
		await transporter.verify();
		await transporter.sendMail({
			from: process.env.GD_EMAIL_ADMIN_ACCOUNT,
			to: recipientEmail,
			subject,
			text: content
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	sendEmail
};
