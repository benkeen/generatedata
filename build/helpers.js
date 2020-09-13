const path = require('path');

const getFileHash = (target) => {
	return `__hash-${path.basename(target, path.extname(target))}`;
};

module.exports = {
	getFileHash
};
