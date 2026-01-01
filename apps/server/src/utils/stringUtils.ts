// JS trim() doesn't trim newlines. This does.
export const trim = (str: string) => str.replace(/^\s+|\s+$/g, '');
export const toSentenceCase = (str: string) => str.toLowerCase().replace(/\.\s*([a-z])|^[a-z]/gm, (s) => s.toUpperCase());
