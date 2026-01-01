import { format } from 'date-fns';

export const getMysqlDateTime = (date = new Date()) => format(date, 'YYYY-MM-DD HH-mm-ss');

// const getUnixTimeFromMySQLDate
