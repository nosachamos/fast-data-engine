const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [path.join(__dirname, '.tmp/index.js')],
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.min.js',
        library: 'fast-data-engine',
        globalObject: 'this',
        libraryTarget: 'umd'
    },
    externals: {
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, './.tmp/tests/benchmarks')],
            },
        ],
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }
};
