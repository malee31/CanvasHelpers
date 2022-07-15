const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outputFilename = 'index-bundle.js';
module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'public'), // Path to Django static files
		filename: outputFilename,
		publicPath: '/'
	},
	module: {
		rules: [
			{
				// From www.saaspegasus.com/guides/modern-javascript-for-django-developers/integrating-django-react/#the-1000-foot-view
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: [
						"@babel/preset-env",
						["@babel/preset-react", { "runtime": "automatic" }]
					]
				}
			}, {
				// Next two are from blog.jakoblind.no/css-modules-webpack
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack'],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: path.resolve(__dirname, "template-index.html") }),
	],
	devServer: {
		devMiddleware: {
			// Actually writes the transpiled code to the public folder instead of keeping it in memory
			writeToDisk: filePath => filePath.endsWith(outputFilename) || filePath.endsWith("index.html")
		}
	},
};
