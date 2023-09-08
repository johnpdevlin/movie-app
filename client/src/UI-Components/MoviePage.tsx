/** @format */
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MovieDetails } from '../models/movie';
import { useFavoriteMovies } from '../context-store/favoritesProvider';
import MobileMoviePage from './MobileMoviePage';
import DesktopMoviePage from './DesktopMoviePage';

function MoviePage() {
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
		setIsLoading(true);
		axios
			.get(
				`https://us-central1-movie-app-server-222.cloudfunctions.net/api/movie/${id}`
			)
			.then((response) => {
				const releaseYear = response.data.release_date.split('-')[0];
				const profit = response.data.revenue - response.data.budget * 2;
				setMovie({ release_year: releaseYear, profit, ...response.data });
			})
			.catch((err) => {
				console.log(err);
			});

		setIsLoading(false);
	}, [id]);

	const [isSmall, setIsSmall] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 750px)');

		const handleMediaQueryChange = (e: {
			matches: boolean | ((prevState: boolean) => boolean);
		}) => {
			setIsSmall(e.matches);
		};

		// Add event listener for media query changes
		mediaQuery.addEventListener('change', handleMediaQueryChange);

		// Clean up the event listener when the component unmounts
		return () => {
			mediaQuery.removeEventListener('change', handleMediaQueryChange);
		};
	}, []);

	if (isLoading === false)
		return (
			<>
				<Box
					sx={{
						margin: 0,
						padding: 0,
						overflow: 'hidden',
						width: '100%',
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
					{isSmall ? (
						<MobileMoviePage
							movie={movie}
							isLoading={isLoading}
							isFavorite={isFavorite}
							toggleFavorite={toggleFavorite}
						/>
					) : (
						<DesktopMoviePage
							movie={movie}
							isLoading={isLoading}
							isFavorite={isFavorite}
							toggleFavorite={toggleFavorite}
						/>
					)}
				</Box>
			</>
		);
}

export default MoviePage;
