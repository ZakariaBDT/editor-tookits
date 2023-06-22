/**
 * Device Attributes
 */

import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'bep/device-attributes',
	function (settings) {
		settings.attributes = Object.assign(settings.attributes, {
			hideOnDesktop: {
				type: 'boolean',
				default: false,
			},
			hideOnTablet: {
				type: 'boolean',
				default: false,
			},
			hideOnMobile: {
				type: 'boolean',
				default: false,
			},
		});
		return settings;
	}
);
