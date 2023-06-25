const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

/**
 * Add device visibility settings to block sidebar
 */
const bepAddVisibilitySettings = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes, setAttributes } = props;
		const { hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;

		// Check if the SelectControl is already rendered for this block
		const isSelectControlRendered = attributes.selectControlRendered;

		if (isSelectControlRendered) {
			return <BlockEdit {...props} />;
		}

		// Set selectControlRendered attribute to true to prevent rendering again
		const updatedAttributes = {
			...attributes,
			selectControlRendered: true,
		};

		// Add SelectControl to InspectorControls
		return (
			<>
				<BlockEdit {...props} attributes={updatedAttributes} />
				<InspectorControls>
					<PanelBody
						title={__('Visibility', 'block-editor-plus')}
						initialOpen={false}
					>
						<ToggleControl
							label={__('Hide on Desktop', 'block-editor-plus')}
							checked={hideOnDesktop}
							onChange={() =>
								setAttributes({ hideOnDesktop: !hideOnDesktop })
							}
						/>
						<ToggleControl
							label={__('Hide on Tablet', 'block-editor-plus')}
							checked={hideOnTablet}
							onChange={() =>
								setAttributes({ hideOnTablet: !hideOnTablet })
							}
						/>
						<ToggleControl
							label={__('Hide on Mobile', 'block-editor-plus')}
							checked={hideOnMobile}
							onChange={() =>
								setAttributes({ hideOnMobile: !hideOnMobile })
							}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'bepAddVisibilitySettings');

addFilter('editor.BlockEdit', 'bep/device-controls', bepAddVisibilitySettings);

/**
 * Add visibility class to block
 */
const bepAddVisibilityClass = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const { attributes } = props;

		const { hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;

		const hideOnDesktopClass = hideOnDesktop ? 'bep-hide__desktop' : '';
		const hideOnTabletClass = hideOnTablet ? ' bep-hide__tablet' : '';
		const hideOnMobileClass = hideOnMobile ? ' bep-hide__mobile' : '';

		const combinedClasses =
			hideOnDesktopClass + hideOnTabletClass + hideOnMobileClass;

		return <BlockListBlock {...props} className={combinedClasses} />;
	};
}, 'bepAddVisibilityClass');

addFilter(
	'editor.BlockListBlock',
	'bep/device-class',
	bepAddVisibilityClass,
	20
);
