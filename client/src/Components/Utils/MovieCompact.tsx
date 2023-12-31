/** @format */
import { Paper, Box } from '@mui/material';
import TextOverlayImage from './CompactImage';
import { useEffect, useRef, useState } from 'react';

const MovieCompact = (props: {
	id: number;
	poster: string;
	title: string;
	release_date: string;
	loaded?: boolean;
}) => {
	const paperRef = useRef<HTMLDivElement | null>(null);
	const [paperBorderRadius, setPaperBorderRadius] = useState<number>(0);
	const releaseYear = props.release_date
		? `(${props.release_date.split('-')[0]})`
		: undefined;
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
				<div className={'fade-in'}>
					<Box
						key={props.id}
						minHeight={'100%'}
						sx={{
							':hover': {
								transform: 'scale(1.05)',
								transition: 'transform 0.3s ease',
							},
						}}>
						<Paper elevation={24} ref={paperRef}>
							<TextOverlayImage
								id={props.id}
								image={`${props.poster}`}
								text={props.title}
								subText={releaseYear}
								borderRadius={paperBorderRadius}
							/>
						</Paper>
					</Box>
				</div>
			</>
		);
	}
};

export default MovieCompact;
