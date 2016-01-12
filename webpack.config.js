var webpack = require('webpack');

module.exports = {
	entry : [ 'babel-polyfill', './reactnative/common/LightningStorm.js',
			'./web/common/ui.js', './reactnative/index.ios.js' ],
	output : {
		filename : './web/index.web.build.js'
	},
	module : {
		loaders : [ {
			loader : 'babel-loader',
			exclude : /node_modules/,
			query : {
				plugins : [ 'transform-object-assign' ],
				presets : [ 'es2015', 'stage-0', 'react' ]
			}
		} ],
		noParse : [ /Dimensions/ ],
	},
	plugins : [ new webpack.IgnorePlugin(/(^(?!babel-polyfill)\w+$)|(\.\/rn\/\w+)|(.*\.png)/) ]
}
