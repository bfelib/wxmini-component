module.exports = {
  root: true,
  extends: '@bfehub/stylelint-config-basic',
  overrides: [
    {
      files: ['**/*.wxss'],
      customSyntax: 'postcss-scss',
    },
  ],
}
