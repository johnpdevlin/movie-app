/** @format */
import { Paper, Box } from '@mui/material';
import TextOverlayImage from './TextOverlayImage';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCompact = (props: {
	id: number;
	poster: string;
	title: string;
	release_date: string;
}) => {
	const paperRef = useRef<HTMLDivElement | null>(null);
	const [paperBorderRadius, setPaperBorderRadius] = useState<number>(0);
	const releaseYear = props.release_date.split('-')[0];
	useEffect(() => {
		if (paperRef.current) {
			// Get the Paper component's border radius
			const computedStyle = window.getComputedStyle(paperRef.current);
			const borderRadius = computedStyle.getPropertyValue('border-radius');
			setPaperBorderRadius(parseFloat(borderRadius));
		}
	}, []);
	if (props.poster!) {
		return (
			<>
				<Box key={props.id} minHeight={'100%'}>
					<Link to={`/${props.id}/`}>
						<Paper elevation={24} ref={paperRef}>
							<TextOverlayImage
								image={`${props.poster}`}
								text={props.title}
								subText={`(${releaseYear})`}
								borderRadius={paperBorderRadius}
							/>
						</Paper>
					</Link>
				</Box>
			</>
		);
	}
};

export default MovieCompact;
