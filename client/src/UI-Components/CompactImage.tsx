/** @format */

import { Box, Typography, IconButton } from '@mui/material';
import { CSSProperties } from 'react';
import { formatStringWithColon } from '../utils/format';
import { Favorite, FavoriteBorder } from '@mui/icons-material'; // Import your desired icon library
import { useFavoriteMovies } from '../context-store/favoritesProvider';
import { Link } from 'react-router-dom';

const CompactOverlayImage = (props: {
	id: number;
	image: string;
	text: string;
	subText?: string;
	borderRadius?: number;
	width?: number;
	altText?: string;
}) => {
	const { isFavorite, addFavoriteMovie, removeFavoriteMovie } =
		useFavoriteMovies();

	const toggleFavorite = () =>
		isFavorite(props.id)
			? removeFavoriteMovie(props.id)
			: addFavoriteMovie(props.id);

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

	const iconOverlayStyle: CSSProperties = {
		position: 'absolute',
		top: '10px',
		right: '10px',
		color: 'white', // Set the color of the icon
		zIndex: 1, // Ensure the icon appears above the overlay
	};

	return (
		<Box style={containerStyle}>
			<Link to={`/${props.id}/`}>
				<img
					src={`https://image.tmdb.org/t/p/w300/${props.image}`}
					style={imgStyle}
					alt={props.altText}
				/>
			</Link>
			<div style={{ ...overlayStyle, ...overlayBackgroundStyle }}>
				<Typography variant='h6' textAlign={'center'} color={'whitesmoke'}>
					{formatStringWithColon(props.text)} <br /> {props.subText}
				</Typography>
			</div>

			{isFavorite(props.id) ? (
				<IconButton style={iconOverlayStyle} onClick={toggleFavorite}>
					<Favorite />
				</IconButton>
			) : (
				<IconButton style={iconOverlayStyle} onClick={toggleFavorite}>
					<FavoriteBorder />
				</IconButton>
			)}
		</Box>
	);
};

export default CompactOverlayImage;
