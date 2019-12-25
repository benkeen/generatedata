export const getUnique = (arr: any[]) => arr.filter((v, i, a) => a.indexOf(v) === i);
