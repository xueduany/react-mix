var webpack = require('webpack');
module.exports = {
	entry : ['./index.ios2.js'],
	output : {
		filename : './z3.txt'
	},
	
	module : {

		    loaders: [{
		      test: /\.(js|jsx|es6)$/,
		      exclude: /node_modules/,
		      loader: 'babel-loader',
		      query: {
		        cacheDirectory: true,
		        presets: ['stage-0', 'es2015', 'react']
		      }
		    }],
		/*
		loaders : [ {
			loader : 'babel-loader',
			exclude : /node_modules/,
			query : {
				presets : [ 'es2015', 'react' ]
			}
		} ]
		*/
	},
	
	plugins: [
new webpack.IgnorePlugin(/(^\w)|(\.\/rn\/\w+)/)
	          ]
}