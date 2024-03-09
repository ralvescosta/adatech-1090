import type {Config} from 'jest';

const config: Config = {
  roots: ['<rootDir>'],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/controllers/*.ts',
    '!<rootDir>/src/controllers/interfaces.ts',
  ]
};

export default config;
