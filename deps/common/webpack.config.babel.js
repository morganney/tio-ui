import path from 'path';

import pkgJson from './package';

const externals = {};
const hivekitDeps = [
    '@hivekit/date-picker',
    '@hivekit/form',
    '@hivekit/layout',
    '@hivekit/select',
    '@hivekit/button',
    '@hivekit/core'
];

for (const peer of Object.keys(pkgJson.peerDependencies).concat(hivekitDeps)) {
    externals[peer] = {
        commonjs: peer,
        commonjs2: peer
    };
}

export default {
    mode: 'development',
    context: __dirname,
    entry: {
        'tio-common': path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'tio-common.js',
        chunkFilename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias: {
            'schedule': path.resolve(__dirname, 'src/schedule'),
            'validation': path.resolve(__dirname, 'src/validation')
        }
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-react',
                        ['@babel/preset-env', {
                            targets: {
                                browsers: ['last 2 versions']
                            },
                            useBuiltIns: 'entry'
                        }]
                    ],
                    plugins: [
                        require('@babel/plugin-proposal-class-properties'),
                        require('@babel/plugin-proposal-object-rest-spread')
                    ]
                }
            }
        ]
    },
    externals,
    devtool: 'inline-source-map'
};
