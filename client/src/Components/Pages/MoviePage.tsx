/** @format */

import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useTransition } from 'react';
import { MovieDetails } from '../../models/movie';
import { useFavoriteMovies } from '../../context-store/favoritesProvider';
import MobileMoviePage, { MobileMovieSkeleton } from './MobileMoviePage';
import DesktopMoviePage, { DesktopMovieSkeleton } from './DesktopMoviePage';
import { useSavedMovies } from '../../context-store/savedProvider';

function MoviePage() {
	const { id } = useParams();

	const [isPending, startTransition] = useTransition();
	const [movie, setMovie] = useState<MovieDetails>();
	const { addFavoriteMovie, removeFavoriteMovie, isFavorite } =
		useFavoriteMovies();
	const { addSavedMovie, removeSavedMovie, isSaved } = useSavedMovies();

	const toggleSaved = () => {
		if (isSaved(movie!.id)) {
			removeSavedMovie(movie!.id);
		} else {
			addSavedMovie(movie!);
		}
	};

	const toggleFavorite = () => {
		if (isFavorite(movie!.id)) {
			removeFavoriteMovie(movie!.id);
		} else {
			addFavoriteMovie(movie!);
		}
	};

	useEffect(() => {
		startTransition(() => {
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
		});
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

	return (
		<>
			<Box
				sx={{
					margin: 0,
					padding: 0,
					overflow: 'hidden',
					minHeight: '100vh',
					minWidth: '100vh',
					backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					opacity: 0.8,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					textAlign: 'center',
					color: 'white',
					backgroundColor: 'black',
				}}>
				<>
					{isSmall === true ? (
						isPending ? (
							MobileMovieSkeleton
						) : (
							<MobileMoviePage
								movie={movie}
								isFavorite={isFavorite}
								isSaved={isSaved}
								toggleFavorite={toggleFavorite}
								toggleSaved={toggleSaved}
							/>
						)
					) : null}
					{isSmall === false ? (
						isPending ? (
							DesktopMovieSkeleton
						) : (
							<DesktopMoviePage
								movie={movie}
								isFavorite={isFavorite}
								isSaved={isSaved}
								toggleFavorite={toggleFavorite}
								toggleSaved={toggleSaved}
							/>
						)
					) : null}
				</>
			</Box>
		</>
	);
}

export default MoviePage;
