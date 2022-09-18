const path = require('path');

module.exports = {
    entry: [path.join(__dirname, '.tmp/index.js')],
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.js',
        library: 'fast-data-engine',
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
        minimize: false
    }
};
