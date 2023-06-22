const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;
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
 * Add style to block
 */
const bepAddTypoStyle = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const { attributes } = props;

		const { deskFontSize, tabFontSize, mobFontSize } = attributes;

		// return (
		// 	<BlockListBlock {...props} className="bep-container">
		// 		{`<style>
		//         .bep-container {
		//             font-size: ${deskFontSize}px;
		//         }
		//     </style>`}
		// 	</BlockListBlock>
		// );
		return <BlockListBlock {...props} className="bep-container" />;
	};
}, 'bepAddTypoStyle');

addFilter('editor.BlockListBlock', 'bep/typo-style', bepAddTypoStyle);
