const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.alias = {
  "@": "./", // Ensure "@" alias points to root
  "@/components": "./components",
  "@/app": "./app",
};

module.exports = defaultConfig;
