import capitalize from '../src/capitalize';

test('capitalizing the first letter of the string', () => {
  const str = '  test';
  expect(capitalize(str)).toEqual('  Test');
});
