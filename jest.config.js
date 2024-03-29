module.exports = {
  projects: [
    { preset: "jest-expo/ios" },
    { preset: "jest-expo/android" },
  ],
  transformIgnorePatterns: [
    // eslint-disable-next-line max-len
    "node_modules/(?!(jest-)?react-native|react-native-base64|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-utils|@react-utils/.*|@unimodules/.*|sentry-expo|native-base)",
  ],
};
