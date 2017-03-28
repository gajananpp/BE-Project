const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		app: './app.js'
	},
	output: {
		path: path.resolve(__dirname, './public/javascripts'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'stage-1', 'react']
						},
					},
				],	
			},
		],
	},
	resolve: {
		'modules': [path.resolve(__dirname, './src'), 'node_modules'],
	}
};