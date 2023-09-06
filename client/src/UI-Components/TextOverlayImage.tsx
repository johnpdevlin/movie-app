/** @format */

import Typography from '@mui/material/Typography';

import { CSSProperties } from 'react';

const TextOverlayImage = (props: {
	image: string;
	text: string;
	subText?: string;
	borderRadius?: number;
	width?: number;
	altText?: string;
}) => {
	const imageWidth = props.width || 100;

	const containerStyle: CSSProperties = {
		position: 'relative',
		textAlign: 'center',
		color: 'black',
		overflow: 'hidden',
		borderRadius: props.borderRadius, // Set a default border radius
	};

	const imgStyle: CSSProperties = {
		width: `${imageWidth}%`,
		borderRadius: props.borderRadius, // Set a default border radius
	};

	const overlayStyle: CSSProperties = {
		position: 'absolute',
		bottom: '0',
		left: '0',
		right: '0',
		overflow: 'hidden',
		borderBottomLeftRadius: props.borderRadius,
		borderBottomRightRadius: props.borderRadius,
		paddingTop: '10px',
		paddingBottom: '10px',
	};

	const overlayBackgroundStyle: CSSProperties = {
		backgroundColor: 'rgba(245, 245, 210, 0.65)',
		backdropFilter: 'blur(2px)',
	};

	return (
		<div style={containerStyle}>
			<img src={props.image} style={imgStyle} alt={props.altText} />
			<div style={{ ...overlayStyle, ...overlayBackgroundStyle }}>
				<Typography variant='h6'>
					{props.text} <br /> {props.subText}
				</Typography>
			</div>
		</div>
	);
};

export default TextOverlayImage;
