const { format } = require("date-fns");

const getMysqlDateTime = (date = new Date()) => format(date, 'YYYY-MM-DD HH-mm-ss');

// const getUnixTimeFromMySQLDate

module.exports = {
	getMysqlDateTime
};
