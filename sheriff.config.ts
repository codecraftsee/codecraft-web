import { noDependencies, SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  modules: {
    'src/app/features/<domain>': ['domain:<domain>'],
    'src/app/shared': ['shared'],
    'src/app/core': ['core'],
  },
  depRules: {
    'domain:*': ['shared', 'core'],
    shared: ['core'],
    core: noDependencies,
  },
};
