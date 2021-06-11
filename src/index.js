import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';

import './style.scss';
import Edit from './edit';
import Save from './save';

registerBlockType( 'homehero/homehero', {
	apiVersion: 2,
    attributes: {
			message: {
					type: 'string',
					source: 'text',
					selector: 'div.herotitle',
					default: '', // empty default
			},
			buttontext: {
				type: 'string',
				source: 'text',
				selector: 'div.herobutton',
				default: '', // empty default
			},
			bg_color: { type: 'string', default: '#21759b' },
			button_color: { type: 'string', default: '#9b2176' },
			mediaId: {
				type: 'number',
				default: 0
			},
			mediaUrl: {
				type: 'string',
				default: ''
			},
			mediaThumb: {
				type: 'string',
				default: ''
			}
    },
	edit: withSelect((select, props) => {
		return { media: props.attributes.mediaId ? select('core').getMedia(props.attributes.mediaId) : undefined };
	})(Edit),
	save: Save,
} );
