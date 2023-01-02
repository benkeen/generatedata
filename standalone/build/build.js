import { TsconfigPathsPlugin } from '@esbuild-plugins/tsconfig-paths';
import { build } from 'esbuild';

build({
    entryPoints: ['../src/index.ts'],
    plugins: [
        TsconfigPathsPlugin({ tsconfig: 'tsconfig.json' })
    ],
    outdir: '../dist/',
    platform: 'node',
    target: 'node12',
    format: 'cjs',
    bundle: true,
    external: ['canvas', './xhr-sync-worker.js']
});
