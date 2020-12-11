// JS trim() doesn't trim newlines. This does.
const trim = (str) => str.replace(/^\s+|\s+$/g, '');

module.exports = {
	trim
};
