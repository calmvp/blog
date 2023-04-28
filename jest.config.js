const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/lib/text-encoder.mock.ts']
}

// https://github.com/vercel/next.js/issues/35634#issuecomment-1115250297
// workaround for node modules exporting esm
async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)();

  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!react-markdown)/';
  return nextJestConfig;
}
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
//module.exports = createJestConfig(customJestConfig);
module.exports = jestConfig;
