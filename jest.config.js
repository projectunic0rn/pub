module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
  },
  testRegex: '(/__tests__/.*\\.([tj]sx?)|(\\.|/)(test|spec))\\.([tj]sx?)$',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@contexts': '<rootDir>/src/contexts/index',
    '^@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^@hooks': '<rootDir>/src/hooks/index',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
    '^@utils': '<rootDir>/src/utils/index',
    '^@styles': '<rootDir>/src/styles/index',
    '^@images': '<rootDir>/src/images/index',
    '^@helpers': '<rootDir>/src/helpers/index',
    '^@api': '<rootDir>/src/api/index',
    '^@mocks': '<rootDir>/src/mocks/index',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['node_modules', '.cache'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  setupFiles: ['<rootDir>/loadershim.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'scripts/**/*.{js,jsx,ts,tsx}',
    '!src/**/index.ts',
    '!src/**/*.d.ts',
    '!src/**/types/*.ts',
    '!src/mocks/**/*.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 19,
      functions: 19,
      lines: 24,
      statements: 24,
    },
  },
};
