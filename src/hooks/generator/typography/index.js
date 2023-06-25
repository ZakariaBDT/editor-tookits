const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

/**
 * Add Typography settings to block sidebar
 */
const bepAddTypographySettings = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes, setAttributes } = props;
		const { deskFontSize, tabFontSize, mobFontSize } = attributes;

		// Check if the SelectControl is already rendered for this block
		const isTypoRendered = attributes.typoRendered;

		if (isTypoRendered) {
			return <BlockEdit {...props} />;
		}

		// Set selectControlRendered attribute to true to prevent rendering again
		const updatedAttributes = {
			...attributes,
			typoRendered: true,
		};

		// Add SelectControl to InspectorControls
		return (
			<>
				<BlockEdit {...props} attributes={updatedAttributes} />
				<InspectorControls>
					<PanelBody
						title={__('Typography', 'block-editor-plus')}
						initialOpen={false}
					>
						<RangeControl
							label={__('Desktop Font Size', 'block-editor-plus')}
							value={deskFontSize}
							onChange={(value) =>
								setAttributes({ deskFontSize: value })
							}
							min={1}
							max={100}
						/>
						<RangeControl
							label={__('Tablet Font Size', 'block-editor-plus')}
							value={tabFontSize}
							onChange={(value) =>
								setAttributes({ tabFontSize: value })
							}
							min={1}
							max={100}
						/>
						<RangeControl
							label={__('Mobile Font Size', 'block-editor-plus')}
							value={mobFontSize}
							onChange={(value) =>
								setAttributes({ mobFontSize: value })
							}
							min={1}
							max={100}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'bepAddTypographySettings');

addFilter('editor.BlockEdit', 'bep/typo-controls', bepAddTypographySettings);

/**
 * Add Typography styles to block
 */
const bepAddTypoStyle = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, clientId } = props;

		const uniqueId = `bep-${clientId.slice(0, 8)}`;

		const { deskFontSize, tabFontSize, mobFontSize } = attributes;

		// Modify the block's output here
		const modifiedBlock = (
			<Fragment>
				<style>
					{`
						.${uniqueId} {
							font-size: ${deskFontSize}px !important;
						}
						@media only screen and (max-width: 768px) {
							.${uniqueId} {
								font-size: ${tabFontSize}px !important;
							}
						}
						@media only screen and (max-width: 480px) {
							.${uniqueId} {
								font-size: ${mobFontSize}px !important;
							}
						}
					`}
				</style>
				<BlockEdit {...props} />
			</Fragment>
		);

		return modifiedBlock;
	};
}, 'bepAddTypoStyle');

addFilter('editor.BlockEdit', 'bep/typo-style', bepAddTypoStyle);

/**
 * Add unique class to block
 */
const bepAddUniqueClass = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const { clientId } = props;

		const uniqueId = `bep-${clientId.slice(0, 8)}`;

		return <BlockListBlock {...props} className={uniqueId} />;
	};
}, 'bepAddUniqueClass');

addFilter('editor.BlockListBlock', 'bep/unqueId-class', bepAddUniqueClass, 9);
