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
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  }
};

export default config;
