// @ts-check
const fs = require("fs");

/**
 * @param {string} filename
 * @param {string} content
 * @returns {void}
 */
module.exports = (filename, content) => {
  if (fs.existsSync(filename)) {
    const currentInput = fs.readFileSync(filename, "utf-8");

    // compare file contents ignoring whitespace
    if (currentInput.replace(/\s+/g, "") !== content.replace(/\s+/g, "")) {
      fs.writeFileSync(filename, content, "utf8");
    }
  } else {
    fs.writeFileSync(filename, content, "utf8");
  }
};
