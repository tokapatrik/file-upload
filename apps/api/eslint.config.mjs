import { config as nestConfig } from '@file-upload/eslint-config/nest';

/** @type {import("typescript-eslint").ConfigArray} */
export default [
  {
    ignores: ['eslint.config.mjs']
  },
  ...nestConfig
];
