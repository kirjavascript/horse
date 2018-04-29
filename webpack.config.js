const webpack = require('webpack');

module.exports = (env={}, args={}) => {

    const config = {
        mode: 'development',
        entry : {
            root: __dirname + '/modules/index.js',
        },
        output: {
            path: __dirname  + '/static',
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    'es2015',
                                    'stage-0',
                                ],
                                plugins: [
                                    'transform-react-jsx',
                                    'transform-decorators-legacy',
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.scss/,
                    use: [
                        { loader:'style-loader' },
                        { loader:'raw-loader' },
                        { loader:'sass-loader' },
                        { loader:'import-glob-loader' },
                    ]
                },
            ],
        },
        plugins: [
        ],
        resolve: {
            extensions: ['.js', '.json', '.jsx'],
            alias: {
            }
        },
        devtool: env.dev ? 'source-map' : false,
        performance: {
            hints: false,
        },
    };

    return config;

}
