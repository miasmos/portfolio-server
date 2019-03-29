var nodeExternals = require('webpack-node-externals');
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: './app.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            { test: /\.(t|j)sx?$/, use: ['ts-loader', 'eslint-loader'] },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    devtool: 'source-map'
};
