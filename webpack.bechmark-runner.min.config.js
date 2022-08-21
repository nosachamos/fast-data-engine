const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [path.join(__dirname, '.tmp-benchmarks/benchmarks/benchmarkRunner.js')],
    output: {
        path: path.join(__dirname, '/build/benchmarks'),
        filename: 'benchmark-runner.min.js',
        library: 'fast-data-engine',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    externals: {
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
    },
    target: 'node',
    optimization: {
        // minimizer: [new UglifyJsPlugin()]
    }
};
