export default {
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'src/styles/foundation/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
    },
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/foundation/',
      files: [
        {
          destination: '_css-variables.scss',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'site/_data/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
};
