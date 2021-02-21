import { Config } from '@stencil/core';
import alias from '@rollup/plugin-alias';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'stencilchatjs',
  rollupPlugins: {
    before: [
      // Plugins injected before rollupNodeResolve()
      alias({
        entries: [
          {
            find: 'chart.js',
            replacement: 'node_modules/chart.js/dist/Chart.bundle.js'
          }
        ]
      })
    ],
    after: [
      // Plugins injected after commonjs()
      nodePolyfills()
    ]
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
