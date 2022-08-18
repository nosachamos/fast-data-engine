const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [path.join(__dirname, '.tmp-benchmarks/benchmarks/run.js')],
    output: {
        path: path.join(__dirname, '/build/benchmarks'),
        filename: 'benchmarks.min.js',
        library: 'fast-data-engine',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    target: 'node',
    optimization: {
        // minimizer: [new UglifyJsPlugin()]
    }
};
