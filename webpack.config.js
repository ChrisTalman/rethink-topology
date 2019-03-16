'use strict';

// External Modules
const Path = require('path');
const { BannerPlugin } = require('webpack');
const NodeExternals = require('webpack-node-externals');

// Constants
const TYPESCRIPT_IGNORE = /(?:node_modules)$/;

const appConfig =
{
	mode: 'development',
    target: 'node',
    entry: './src/App/index.ts',
    resolve:
    {
        extensions: ['.ts', '.js', '.json'],
        alias: { src: __dirname + '/src' }
    },
    output:
    {
        filename: 'index.js',
        path: __dirname,
        libraryTarget: 'umd'
    },
    watch: true,
    module:
    {
        rules:
        [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/,
                exclude: TYPESCRIPT_IGNORE
            }
        ]
    },
	externals:
	[
		NodeExternals()
	]
};

const cliConfig = Object.assign({}, appConfig);
cliConfig.entry = './src/CLI/index.ts';
cliConfig.output.filename = 'cli.js';
cliConfig.plugins = [new BannerPlugin({banner: '#!/usr/bin/env node', raw: true})];

module.exports = [appConfig, cliConfig];