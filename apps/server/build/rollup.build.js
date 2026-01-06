import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const externalPackages = [
  '@apollo/server',
  '@as-integrations/express5',
  '@generatedata/config',
  '@generatedata/i18n',
  '@generatedata/types',
  '@generatedata/utils',
  'bcryptjs',
  'codemirror',
  'cookie-parser',
  'cors',
  'date-fns',
  'express',
  'google-auth-library',
  'graphql',
  'jsonwebtoken',
  'mysql2',
  'nanoid',
  'sequelize',
];

export default () => {
  return {
    input: 'src/app.ts',
    output: {
      file: 'dist/app.js',
      format: 'cjs',
      inlineDynamicImports: false
    },
    treeshake: false,
    external: (id) => {
      // Only mark npm packages as external, keep all local files internal  
      return externalPackages.some(pkg => id === pkg || id.startsWith(pkg + '/'));
    },
    plugins: [
      typescript(),
      nodeResolve({ 
        preferBuiltins: true,
        modulesOnly: false 
      }),
      commonjs(),
    ]
  };
};
