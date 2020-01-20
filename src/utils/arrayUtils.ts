export const getUnique = <T>(arr: T[]): T[] => arr.filter((v, i, a) => a.indexOf(v) === i);

// returns an empty array of a particular size
export const getArrayOfSize = (size: number): any[] => [...Array(size)];
