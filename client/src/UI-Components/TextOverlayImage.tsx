/** @format */

import { Box, Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { formatStringWithColon } from '../utils/format';

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
		borderRadius: props.borderRadius,
	};

	const imgStyle: CSSProperties = {
		width: `${imageWidth}%`,
		borderRadius: props.borderRadius,
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
		backgroundColor: 'black',
		opacity: '0.65',
		backdropFilter: 'blur(2px)',
	};

	return (
		<Box style={containerStyle}>
			<img
				src={`https://image.tmdb.org/t/p/w300/${props.image}`}
				style={imgStyle}
				alt={props.altText}
			/>
			<div style={{ ...overlayStyle, ...overlayBackgroundStyle }}>
				<Typography variant='h6' textAlign={'center'} color={'whitesmoke'}>
					{formatStringWithColon(props.text)} <br /> {props.subText}
				</Typography>
			</div>
		</Box>
	);
};

export default TextOverlayImage;
