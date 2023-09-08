/** @format */

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CalculateIcon from '@mui/icons-material/Calculate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import MovieRating from './MovieRating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {
	formatMinutesToHoursAndMinutes,
	formatDollarsToCompact,
} from '../utils/format';
import { MovieDetails } from '../models/movie';
import { formatStringWithColon } from '../utils/format';

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
								<FavoriteIcon onClick={toggleFavorite} />
							) : (
								<FavoriteBorderIcon onClick={toggleFavorite} />
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
										<LanguageIcon fontSize='small' />
									</Tooltip>
									{movie?.original_language}
								</Typography>
							) : null}
							{movie?.runtime ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Runtime'>
										<AccessTimeIcon fontSize='small' />
									</Tooltip>
									{formatMinutesToHoursAndMinutes(movie.runtime)}
								</Typography>
							) : null}
							{movie?.revenue ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Revenue'>
										<AttachMoneyIcon fontSize='small' />
									</Tooltip>
									{formatDollarsToCompact(movie.revenue)}
								</Typography>
							) : null}
							{movie?.budget ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Budget'>
										<CalculateIcon fontSize='small' />
									</Tooltip>
									{formatDollarsToCompact(movie!.budget)}
								</Typography>
							) : null}
							{movie?.profit ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Profit'>
										<ShowChartIcon fontSize='small' />
									</Tooltip>
									{formatDollarsToCompact(movie.profit)}
								</Typography>
							) : null}
							{movie?.production_companies ? (
								<Typography variant='subtitle2' color='text.secondary'>
									<Tooltip title='Production Companies'>
										<BusinessIcon fontSize='small' />
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
