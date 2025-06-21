import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import babel from "@rollup/plugin-babel";


export default [{
    input: "./src/client.ts",
    watch: true,
    output: {
        sourcemap: true,
        file: './dist/static/js/index.js',
        format: 'iife'
    },
    plugins: [
        resolve(),
        json(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json"}),
        sourcemaps(),
        babel()
    ]
}]