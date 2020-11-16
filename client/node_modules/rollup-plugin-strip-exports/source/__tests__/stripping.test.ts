import stripExports from '../index';
import { rollup } from 'rollup';
import globby from 'globby';
import path from 'path';

test.each(
  globby.sync(path.join(__dirname, '__specs__')).map((pathname) => {
    const { name } = path.parse(pathname);
    return [name, pathname];
  })
)('%s', async (name, pathname) => {
  const bundle = await rollup({
    input: pathname,
    treeshake: false,
    plugins: [stripExports()],
  });
  const { output } = await bundle.generate({ format: 'es' });

  expect(output[0].code).toMatchSnapshot();
});
