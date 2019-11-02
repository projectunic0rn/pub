module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  testRegex: '(/__tests__/.*\\.([tj]sx?)|(\\.|/)(test|spec))\\.([tj]sx?)$',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
    '^@/helpers': '<rootDir>/src/helpers',
    '@/api(.*)$': '<rootDir>/src/api/$1',
    '@/mocks(.*)$': '<rootDir>/src/mocks/$1',
    '@images(.*)$': '<rootDir>/src/images/$1',
    '@components(.*)$': '<rootDir>/src/components/$1',
    '@hooks(.*)$': '<rootDir>/src/hooks/$1',
    '@utils(.*)$': '<rootDir>/src/utils/$1',
    '@/styles(.*)$': '<rootDir>/src/styles/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['node_modules', '.cache'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/loadershim.js'],
};
