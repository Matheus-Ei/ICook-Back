export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  detectOpenHandles: true,
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      { isolatedModules: true, tsconfig: './test/tsconfig.json' },
    ],
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './report/test',
        filename: 'index.html',
        expand: true,
        pageTitle: 'Test report',
        openReport: false, // Open automatically after tests
        hideIcon: true, // Remove test icons
        theme: 'dark', // Changes the relatory theme
      },
    ],
  ],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};
