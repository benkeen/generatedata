import classNameList from './classNameList';

it('should not throw when a supported CSS module is imported', () => {
  classNameList();
});

it('should reflect property names back to the consuming module', () => {
  const classNames = classNameList();
  
  expect(classNames).toMatchObject(
    [
      'css',
      'less',
      'scss',
      'sss',
      'styl',
    ]
  );
});
