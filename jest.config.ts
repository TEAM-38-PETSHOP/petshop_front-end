import nextJest from 'next/jest';
import type { Config } from '@jest/types';

export const customJestConfig: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export const createJestConfig = nextJest({
  dir: './',
});

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^@@/(.*)$': '<rootDir>/public/$1',
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

export default jestConfig;
