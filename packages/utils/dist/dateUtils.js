import { format, fromUnixTime } from 'date-fns';
import C from '~core/constants';
export const formatDuration = (duration) => {
    const secondsStr = Math.floor(duration % 60).toString();
    const minutes = Math.floor(duration / 60) % 60;
    const minutesStr = minutes.toString();
    const hours = Math.floor(duration / 60 / 60);
    const paddedSecondsStr = secondsStr.length < 2 ? 0 + secondsStr : secondsStr;
    const paddedMinutesStr = minutesStr.length < 2 ? 0 + minutesStr : minutesStr;
    if (hours) {
        return `${hours}:${paddedMinutesStr}:${paddedSecondsStr}`;
    }
    else if (minutes) {
        return `${minutes}:${paddedSecondsStr}`;
    }
    else {
        return `0:${paddedSecondsStr}`;
    }
};
export const formatUnixTime = (time, formatStr = C.DATETIME_FORMAT) => {
    if (!time) {
        return '';
    }
    return format(fromUnixTime(time), formatStr);
};
export const isValidDateFormat = (dateFormat) => {
    let isValid = true;
    try {
        format(new Date(), dateFormat);
    }
    catch (e) {
        isValid = false;
    }
    return isValid;
};
//# sourceMappingURL=dateUtils.js.map