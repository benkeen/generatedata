export const getUnique = (arr: any[]) => arr.filter((v, i, a) => a.indexOf(v) === i);

// returns an empty array of a particular size
export const getArrayOfSize = (size: number) => [...Array(size)];
