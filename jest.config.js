export default {
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.js"], 
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest", // 
  },
};