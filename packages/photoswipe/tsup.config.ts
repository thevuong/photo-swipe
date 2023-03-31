import { defineConfig, Options } from 'tsup';

const configs: Options = {
  dts: true,
  format: ['esm', 'cjs'],
  external: [],
};

export default defineConfig((options) => [
  {
    ...configs,
    minify: !options.watch,
    clean: !options.watch,
    entry: {
      index: './src/photoswipe.ts',
    },
    ...options,
  },
  {
    ...configs,
    minify: !options.watch,
    clean: !options.watch,
    entry: {
      index: './src/lightbox/lightbox.ts',
    },
    outDir: 'dist/lightbox',
    ...options,
  },
  {
    minify: !options.watch,
    clean: !options.watch,
    entry: {
      index: './src/photoswipe.css',
    },
    outDir: 'dist/css',
    ...options,
  },
]);
