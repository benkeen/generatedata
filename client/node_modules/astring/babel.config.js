module.exports = api => {
  api.cache.never()
  switch (process.env.BABEL_MODE) {
    case 'minified':
      return {
        presets: [
          [
            '@babel/preset-env',
            {
              forceAllTransforms: true,
              modules: "umd",
            },
          ],
          [
            'minify',
            {
              mangle: {
                blacklist: {
                  generate: true,
                  baseGenerator: true,
                },
              },
            },
          ],
        ],
      }
    default:
      return {
        presets: [
          [
            '@babel/preset-env',
            {
              forceAllTransforms: true,
            },
          ],
        ],
      }
  }
}