import path from 'path';

import webpack from 'webpack';
import WebpackShellPlugin from 'webpack-shell-plugin';
import StringReplacePlugin from 'string-replace-webpack-plugin';

import pkgJson from './package';
import locales from './i18n/locales';
import { localesPlaceholder } from './build/replacement-strings';

const externals = {};

for (const peer of Object.keys(pkgJson.peerDependencies)) {
    externals[peer] = {
        commonjs: peer,
        commonjs2: peer
    };
}

export default {
    context: __dirname,
    entry: {
        alloy: ['whatwg-fetch', path.resolve(__dirname, 'src/index.js')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'alloy.js',
        chunkFilename: '[name].js',
        libraryExport: 'default',
        libraryTarget: 'commonjs2'
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
                        require('@babel/plugin-syntax-dynamic-import'),
                        require('@babel/plugin-proposal-class-properties'),
                        require('@babel/plugin-proposal-object-rest-spread')
                    ]
                }
            },
            {
                test: /replacement-strings\.js$/,
                include: [
                    path.resolve(__dirname, 'build')
                ],
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: new RegExp(`${localesPlaceholder}`),
                            replacement: () => {
                                return locales.toString();
                            }
                        }
                    ]
                })
            }
        ]
    },
    externals,
    resolve: {
        alias: {
            i18n: path.resolve(__dirname, 'i18n'),
            build: path.resolve(__dirname, 'build')
        }
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.BABEL_ENV': JSON.stringify(process.env.BABEL_ENV || 'development'),
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new StringReplacePlugin(),
        new WebpackShellPlugin({
            onBuildStart: [`node ${path.join('bin', 'copy-locale-data')} ${locales.toString()}`]
        })
    ]
};
