export const test = 'string';
export const test1 = 5;
export const test3 = false;
export const test4 = undefined;
export const test5 = new Symbol('duck');

export default (foo) => {
  console.log(foo + 'bar');
};
