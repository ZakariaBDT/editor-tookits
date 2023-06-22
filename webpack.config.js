const path = require('path');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		'hooks/index': path.resolve(process.cwd(), 'src/hooks/index.js'),
	},
};
