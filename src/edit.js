import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import { 
	useBlockProps,
	ColorPalette,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	URLPopover,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';

import './editor.scss';
 
import { 
	TextControl,
	PanelBody,
	PanelRow,
	ToolbarGroup, 
	ToolbarButton,
	Button,
	ToggleControl,
	ResponsiveWrapper
} from '@wordpress/components';

import { 
	Fragment, 
} from '@wordpress/element';

import {
	link,
	edit,
	keyboardReturn
} from '@wordpress/icons';
 
const Edit = ({ attributes, setAttributes, media }) => {
	const onChangeBGColor = ( hexColor ) => {
		setAttributes( { bg_color: hexColor } );
	};

	const onChangeTextColor = ( hexColor ) => {
			setAttributes( { button_color: hexColor } );
	};

	const [ isVisible, setVisiblility ] = useState( false );
	const [ url, setUrl ] = useState( '' );
	const close = () => setVisiblility( false );
	const setTarget = () => {};
	const setLink = event => {
		console.log(event.target.value)
		setUrl(event.target.value)
	}

	const onSelectMedia = (image) => {
		setAttributes({
			mediaId: image.id,
			mediaUrl: image.url,
			mediaThumb: image.sizes.medium.url
		});
		console.log('image', image)
	}

	const removeMedia = () => {
		setAttributes({
			mediaId: 0,
			mediaUrl: '',
			mediaThumb: ''
		});
	}

	const blockStyle = {
		backgroundColor: attributes.bg_color,
		background: attributes.mediaUrl != 0 ? 'url("' + attributes.mediaUrl + '")' : 'none',
		backgroundSize: 'cover'
	}

	console.log('attributes', attributes)

	return (
		<Fragment>
			<InspectorControls key="setting">
				<PanelBody
					title={__('Background Color')}
					initialOpen={true}
				>
					<PanelRow>
						<ColorPalette
							onChange={ onChangeBGColor }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={__('Button Color')}
					initialOpen={true}
				>
					<PanelRow>
						<ColorPalette
							onChange={ onChangeTextColor }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={__('Select hero image', 'awp')}
					initialOpen={ true }
				>
					<PanelRow>
						<div className="editor-post-featured-image">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectMedia}
									value={attributes.mediaId}
									allowedTypes={ ['image'] }
									render={({open}) => (
										attributes.mediaId == 0 
											? <Button isPrimary onClick={open}>Select an image</Button>
											: <>
												<img className='editor-post-featured-image__preview' src={attributes.mediaThumb} style={ { marginBottom: '10px' } } />
												<div className="story-buttons-container">
													<Button isSecondary onClick={open}>Replace image</Button>
													<Button onClick={removeMedia} isLink isDestructive>Remove image</Button>
												</div>
											</>
									)}
								/>
							</MediaUploadCheck>
						</div>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
						//value={ alignment }
						//onChange={ onChangeAlignment }
				/>
				<ToolbarGroup>
					<ToolbarButton
						icon={ edit }
						label="Edit"
						onClick={ () => alert( 'Editing' ) }
					/>
					<ToolbarButton
						icon={ link }
						label="Link"
						onClick={ () => setVisiblility( true ) }
					/>
					{ isVisible && (
						<URLPopover
							onClose={ close }
							renderSettings={ () => (
								<ToggleControl
									label={ __( 'Open in new tab' ) }
									onChange={ setTarget }
								/>
							) }
						>
							<form onSubmit={ close }>
								<input type="url" value={ url } onChange={ setLink } />
								<Button
									icon={ keyboardReturn }
									label={ __( 'Apply' ) }
									type="submit"
								/>
							</form>
						</URLPopover>
					) }
				</ToolbarGroup>
			</BlockControls>

			<div { ...useBlockProps() }
				style={blockStyle}
			>
				<div className='herocontent'>
					<div className='herotitle'>
						<TextControl
							value={ attributes.message }
							onChange={ ( val ) => setAttributes( { message: val } ) }
						/>
					</div>
					<div className='herobutton'>
							<TextControl
								value={ attributes.buttontext }
								onChange={ ( val ) => setAttributes( { buttontext: val } ) }
								style={ {
									backgroundColor: attributes.button_color,
								} }
							/>
					</div>
				</div>
			</div>
		</Fragment>
	)
}
export default Edit