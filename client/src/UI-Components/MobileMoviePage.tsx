/** @format */

import {
	Stack,
	Box,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Tooltip,
} from '@mui/material';
import {
	FavoriteBorder,
	Calculate,
	AttachMoney,
	ShowChart,
	Business,
	AccessTime,
	Favorite,
	Language,
} from '@mui/icons-material';
import {
	formatMinutesToHoursAndMinutes,
	formatDollarsToCompact,
} from '../utils/format';
import { MovieDetails } from '../models/movie';
import { formatStringWithColon } from '../utils/format';
import MovieRating from './MovieRating';

function MobileMoviePage(props: {
	movie: MovieDetails | undefined;
	isLoading: Boolean;
	isFavorite: Boolean;
	toggleFavorite: () => void;
}) {
	const { movie, isLoading, isFavorite, toggleFavorite } = props;

	if (isLoading === false || movie === undefined)
		return (
			<>
				<Card sx={{ textAlign: 'center', contentAlign: 'center' }}>
					<CardMedia
						component='img'
						sx={{ width: '95%', margin: 'auto' }}
						image={`https://image.tmdb.org/t/p/w300/${movie?.poster_path}`}
						alt={movie?.title}
					/>
					<CardContent>
						<Stack flexDirection={'row'} alignItems={'center'}>
							<Box sx={{ minWidth: '90%' }}>
								<Typography variant='h4' component='div'>
									{formatStringWithColon(movie?.title!)}{' '}
									{movie?.release_year ? `(${movie?.release_year})` : ''}
								</Typography>
							</Box>
							{isFavorite ? (
								<Favorite onClick={toggleFavorite} />
							) : (
								<FavoriteBorder onClick={toggleFavorite} />
							)}
						</Stack>

						{movie?.vote_average && (
							<MovieRating value={movie?.vote_average!} />
						)}
						{movie?.overview && (
							<Typography variant='body1' textAlign='justify'>
								{movie?.overview}
							</Typography>
						)}
						<Stack
							textAlign={'start'}
							alignItems={'left'}
							flexDirection={'row'}
							gap={3}>
							{movie?.original_language ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Language'>
										<Language fontSize='small' />
									</Tooltip>
									{movie?.original_language}
								</Typography>
							) : null}
							{movie?.runtime ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Runtime'>
										<AccessTime fontSize='small' />
									</Tooltip>
									{formatMinutesToHoursAndMinutes(movie.runtime)}
								</Typography>
							) : null}
							{movie?.revenue ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Revenue'>
										<AttachMoney fontSize='small' />
									</Tooltip>
									{formatDollarsToCompact(movie.revenue)}
								</Typography>
							) : null}
							{movie?.budget ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Budget'>
										<Calculate fontSize='small' />
									</Tooltip>
									{formatDollarsToCompact(movie!.budget)}
								</Typography>
							) : null}
							{movie?.profit ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Profit'>
										<ShowChart fontSize='small' />
									</Tooltip>
									{formatDollarsToCompact(movie.profit)}
								</Typography>
							) : null}
							{movie?.production_companies ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Production Companies'>
										<Business fontSize='small' />
									</Tooltip>
									{movie?.production_companies.map((comp, index) => (
										<span key={index}>
											{index > 0 && ', '}
											{comp.name}
										</span>
									))}
								</Typography>
							) : null}
						</Stack>
						{movie?.genres && (
							<div>
								{movie?.genres.map((gen) => (
									<Chip label={gen.name} key={gen.id} sx={{ m: 0.5 }} />
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</>
		);
}

export default MobileMoviePage;
