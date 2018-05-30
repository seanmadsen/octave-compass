import CustomMath from "./CustomMath";

test('valueFrequency', () => {
  expect(CustomMath.valueFrequency(['a', 'a', 'b', 'b', 'b', 'c']))
    .toEqual({a: 2, b: 3, c: 1});
});

test('cartesianProduct', () => {
  expect(CustomMath.cartesianProduct(
    ['a', 'b', 'c'],
    ['d'],
    ['e', 'f']
  )).toEqual([
    ['a', 'd', 'e'],
    ['a', 'd', 'f'],
    ['b', 'd', 'e'],
    ['b', 'd', 'f'],
    ['c', 'd', 'e'],
    ['c', 'd', 'f'],
  ]);
});

test('cartesianProduct with spread', () => {
  const array = [['a', 'b'], ['c', 'd']];
  expect(CustomMath.cartesianProduct(...array)).toEqual([
    ['a', 'c'],
    ['a', 'd'],
    ['b', 'c'],
    ['b', 'd'],
  ]);
});

test('linearInterpolate', () => {
  const li = CustomMath.linearInterpolate;
  expect(li(11, {in:0, out: 0}, {in: 1, out:1})).toBe(11);
  expect(li(-13, {in:0, out: 0}, {in: 1, out:1})).toBe(-13);
  expect(li(-1, {in:-1, out: 1}, {in: 3, out:-19})).toBe(1);
  expect(li(3, {in:-1, out: 1}, {in: 3, out:-19})).toBe(-19);
  expect(li(0, {in:-1, out: 1}, {in: 3, out:-19})).toBe(-4);
});
