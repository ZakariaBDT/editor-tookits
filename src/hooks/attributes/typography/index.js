/**
 * Typography Attributes
 */

import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'bep/typography-attributes',
	function (settings, name) {
		if (name === 'core/paragraph' || name === 'core/heading') {
			settings.attributes = Object.assign(settings.attributes, {
				deskFontSize: {
					type: 'number',
				},
				tabFontSize: {
					type: 'number',
				},
				mobFontSize: {
					type: 'number',
				},
			});
		}

		return settings;
	}
);
