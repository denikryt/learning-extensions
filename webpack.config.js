module.exports = {
    mode: 'development',
    entry: './background.js',
    output: {
      filename: 'bundle.js',
    },
    experiments: {
        topLevelAwait: true,
      },
  };