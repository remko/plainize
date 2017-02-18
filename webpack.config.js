/* eslint no-var: 0 */

var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
	{
		entry: './plainize.js',
		output: { 
			filename: './dist/plainize.js',
			library: 'plainize',
			libraryTarget: 'umd'
		},
		module: {
			loaders: [
				{ test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' }
			]
		}
	},
	{
		entry: './test/browser.js',
		output: { filename: './browser-test/test.js' },
		module: {
			loaders: [
				{ test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' }
			]
		},
		node: {
			child_process: 'empty',
			fs: 'empty'
		},
		plugins: [
			new CopyWebpackPlugin([
				{ from: require.resolve('mocha/mocha.css'), to: 'browser-test' },
				{ from: './test/index.html', to: 'browser-test' }
			])
		]
	}
];
