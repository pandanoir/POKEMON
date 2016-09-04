// rollup.config.js
import nodeResolve      from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: './js/mainLoop.js',
  dest: 'bundle.js',
  plugins: [
    nodeResolve({ jsnext: true }), // npmモジュールを`node_modules`から読み込む
    commonjs() // CommonJSモジュールをES6に変換
  ]
}