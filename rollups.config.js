// rollup.config.js
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
 
export default {
  entry: 'entry.js',
  dest: 'bundle.js',
  plugins: [
    serve(),      // index.html should be in root of project
    livereload()
  ]
}