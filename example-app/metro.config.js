const packagePath = 'node_modules/expo-crop-image'

module.exports = {
  resolver: {
    nodeModulesPaths: [packagePath],
    // rest of metro resolver options...
  },
  watchFolders: [packagePath],
  // rest of metro options...
}
