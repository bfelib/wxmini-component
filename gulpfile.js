const { src, dest, watch, series } = require('gulp')
const changed = require('gulp-changed')

const SOURCE = 'packages/**'
const DESTINATION = 'examples/dist'

// todo: use ts、less/scss
const task = () => {
  return src(SOURCE).pipe(changed(DESTINATION)).pipe(dest(DESTINATION))
}

exports.default = series(task, () => {
  watch([SOURCE], task)
})
