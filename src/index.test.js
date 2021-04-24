import { getAverage } from './index';

it('getAverage func', () => {
  expect(getAverage([1, 2, 3])).toBe('2.0');
});
