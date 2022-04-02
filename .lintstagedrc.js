module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,less,styl,wxss}': ['stylelint --fix', 'prettier --write'],
  'package.json': ['prettier --write'],
}
