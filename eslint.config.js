// @ts-check
import sheriff from '@softarc/eslint-plugin-sheriff';

export default [
  // Enforces module boundaries defined in sheriff.config.ts.
  // Rules active: deep-import, dependency-rule, encapsulation.
  sheriff.configs.all,

  // When Angular is added, insert angular-eslint config here:
  // ...angularEslint.configs.recommended,
];
