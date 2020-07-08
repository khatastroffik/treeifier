/* eslint-disable notice/notice */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  displayName: {
    name: 'treeifier library',
    color: 'blueBright',
    automock: false,
    bail: 2,
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.d.ts'
    ],
    
  },  
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  coverageReporters: [
    "text",
    "lcov",
    "clover"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  rootDir: ".",
  roots: [
    "<rootDir>/test",
    "<rootDir>/src"
  ],
  setupFilesAfterEnv: [ 'jest-extended' ],
  testEnvironment: "node",
  testMatch: [
    '**/*.spec.ts'
  ],
  testPathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    "^(.*treeifier.*\.)js": "$1ts"
  }
  
};
