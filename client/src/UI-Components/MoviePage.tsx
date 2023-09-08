/** @format */
/** @format */

// import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
import {
	formatMinutesToHoursAndMinutes,
	formatDollarsToCompact,
} from '../utils/format';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MovieDetails } from '../../models/movie';
import { useFavoriteMovies } from '../context/favoritesContext';

const MoviePage = () => {
	const { id } = useParams();

	const [isLoading, setIsLoading] = useState<Boolean>(true);
	const [movie, setMovie] = useState<MovieDetails>();
	const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
		useFavoriteMovies();

	const isFavorite = favoriteMovies.some(
		(favMovie) => favMovie.id === movie?.id
	);

	const toggleFavorite = () => {
		if (isFavorite) {
			removeFavoriteMovie(movie!.id);
		} else {
			addFavoriteMovie(movie!);
		}
	};

	useEffect(() => {
		console.log('hello');
		setIsLoading(true);
		axios
			.get(`http://localhost:8000/movie/${id}`)
			.then((response) => {
				const releaseYear = response.data.release_date.split('-')[0];
				const profit = response.data.revenue - response.data.budget * 2;
				setMovie({ release_year: releaseYear, profit, ...response.data });
			})
			.catch((err) => {
				console.log(err);
			});
		console.log(movie);
		setIsLoading(false);
	}, [id]);
	if (isLoading === false)
		return (
			<>
				<Box
					sx={{
						margin: 0,
						padding: 0,
						overflow: 'hidden',
						width: '100%',
						height: '100vh',
						backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}')`,

						backgroundSize: 'cover',
						backgroundPosition: 'center',
						opacity: 0.7,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						color: 'white',
						backgroundColor: 'black',
					}}>
					<Stack direction={'column'}>
						<Card sx={{ display: 'flex', maxWidth: '900px' }}>
							<CardMedia
								component='img'
								sx={{ width: 351 }}
								image={`https://image.tmdb.org/t/p/w300/${movie?.poster_path}`}
								alt={movie?.title}
							/>

							<Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
								<CardContent sx={{ flex: '1 0 auto' }}>
									<Stack
										direction='row'
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}>
										<Stack
											direction='row'
											spacing={2}
											sx={{ alignItems: 'center' }}>
											<Typography variant='h2'>{movie?.title}</Typography>
											<Typography variant='subtitle1' color='text.secondary'>
												{movie?.release_year}
											</Typography>
										</Stack>
										<Stack direction={'row'} spacing={1} margin={2}>
											{isFavorite ? (
												<FavoriteIcon onClick={toggleFavorite} />
											) : (
												<FavoriteBorderIcon onClick={toggleFavorite} />
											)}
										</Stack>
									</Stack>
									{movie?.vote_average ? (
										<Box sx={{ my: 1.5 }}>
											<MovieRating value={movie?.vote_average!} />
										</Box>
									) : null}
									{movie?.overview ? (
										<Box sx={{ m: 3 }}>
											<Typography variant='body1' textAlign={'justify'}>
												{movie?.overview}
											</Typography>
										</Box>
									) : null}
									<Stack gap={1}>
										{movie?.original_language ? (
											<Stack direction='row' gap={1.5}>
												<Tooltip title='Language'>
													<LanguageIcon />
												</Tooltip>
												{movie?.original_language}
											</Stack>
										) : null}
										{movie?.runtime ? (
											<Stack direction='row' gap={1.5}>
												<Tooltip title='Runtime'>
													<AccessTimeIcon />
												</Tooltip>

												{movie?.runtime
													? formatMinutesToHoursAndMinutes(movie.runtime)
													: 'unknown'}
											</Stack>
										) : null}
										{movie?.revenue ? (
											<Stack direction='row' gap={1.5}>
												<Tooltip title='Revenue'>
													<AttachMoneyIcon />
												</Tooltip>
												{movie?.revenue
													? formatDollarsToCompact(movie.revenue)
													: 'unknown'}
											</Stack>
										) : null}
										{movie?.budget ? (
											<Stack direction='row' gap={1.5}>
												<Tooltip title='Budget'>
													<CalculateIcon />
												</Tooltip>
												{movie?.budget
													? formatDollarsToCompact(movie!.budget)
													: 'unknown'}
											</Stack>
										) : null}
										{movie?.profit ? (
											<Stack direction='row' gap={1.5}>
												<Tooltip title='Profit'>
													<ShowChartIcon />
												</Tooltip>
												{movie?.profit
													? formatDollarsToCompact(movie.profit)
													: 'unknown'}
											</Stack>
										) : null}
										{movie?.production_companies ? (
											<Stack direction='row' gap={1.5}>
												<Tooltip title='Production Companies'>
													<BusinessIcon />
												</Tooltip>
												{movie?.production_companies.map((comp, index) => {
													if (index === movie.production_companies.length - 1) {
														return comp.name;
													}
													return comp.name + ', ';
												})}
											</Stack>
										) : null}
									</Stack>
									{movie?.genres ? (
										<Stack direction='row' spacing={1} sx={{ mt: 2, mb: 1 }}>
											{movie?.genres.map((gen) => {
												return <Chip label={gen.name} key={gen.id} />;
											})}
										</Stack>
									) : null}
								</CardContent>
							</Box>
						</Card>
					</Stack>
				</Box>
			</>
		);
};

export default MoviePage;
