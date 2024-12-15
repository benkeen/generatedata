// JS trim() doesn't trim newlines. This does.
const trim = (str) => str.replace(/^\s+|\s+$/g, '');

const toSentenceCase = (str) =>
	str.toLowerCase().replace(/\.\s*([a-z])|^[a-z]/gm, (s) => s.toUpperCase());

module.exports = {
	trim,
	toSentenceCase
};
