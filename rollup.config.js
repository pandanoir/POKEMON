// rollup.config.js
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  entry: './js/index.js',
  dest: 'bundle.js',
  plugins: [
    json(),
    nodeResolve({ jsnext: true }), // npmモジュールを`node_modules`から読み込む
    commonjs() // CommonJSモジュールをES6に変換
  ]
}