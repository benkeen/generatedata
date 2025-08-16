export const getUnique = (arr) => arr.filter((v, i, a) => a.indexOf(v) === i);
// returns an empty array of a particular size
export const getArrayOfSize = (size) => [...Array(size)];
export const removeItem = (arr, value) => {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        }
        else {
            ++i;
        }
    }
    return arr;
};
export const arrayMove = (array, from, to) => {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
};
//# sourceMappingURL=arrayUtils.js.map