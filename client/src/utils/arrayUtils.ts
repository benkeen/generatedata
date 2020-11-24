export const getUnique = <T>(arr: T[]): T[] => arr.filter((v, i, a) => a.indexOf(v) === i);

// returns an empty array of a particular size
export const getArrayOfSize = (size: number): any[] => [...Array(size)];

export const removeItem = <T>(arr: T[], value: any): T[] => {
	let i = 0;
	while (i < arr.length) {
		if (arr[i] === value) {
			arr.splice(i, 1);
		} else {
			++i;
		}
	}
	return arr;
};

export const arrayMove = (array: any[], from: number, to: number): any[] => {
	array = array.slice();
	array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
	return array;
};
