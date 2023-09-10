/** @format */

import { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { MovieDetails } from '../models/movie'; // Import MovieDetails model
import axios from 'axios';

// Create a context
type FavoriteMoviesContextType = {
	favoriteMovies: MovieDetails[];
	addFavoriteMovie: (movie: MovieDetails) => void;
	isFavorite: (movieId: number) => boolean;
	removeFavoriteMovie: (movieId: number) => void;
	getFavoritesCount: () => number;
};

const FavoriteMoviesContext = createContext<
	FavoriteMoviesContextType | undefined
>(undefined);

type FavoriteMoviesProviderProps = {
	children: ReactNode;
};

export function useFavoriteMovies() {
	const context = useContext(FavoriteMoviesContext);
	if (!context) {
		throw new Error(
			'useFavoriteMovies must be used within a FavoriteMoviesProvider'
		);
	}
	return context;
}

export function FavoriteMoviesProvider({
	children,
}: FavoriteMoviesProviderProps) {
	const [favoriteMovies, setFavoriteMovies] = useLocalStorage<MovieDetails[]>(
		'favoriteMovies',
		[]
	);

	const addFavoriteMovie = (movie: MovieDetails | number) => {
		if (typeof movie === 'number') {
			axios
				.get(`http://localhost:8000/movie/${movie}`)
				.then((response) => {
					const releaseYear = response.data.release_date.split('-')[0];
					const profit = response.data.revenue - response.data.budget * 2;
					const movieDetails: MovieDetails = {
						release_year: releaseYear,
						profit: profit,
						...response.data,
					};
					addFavoriteMovie(movieDetails);
				})
				.catch((error) => {
					// Handle errors if necessary
					console.error('Error fetching movie details:', error);
				});
		} else {
			setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
		}
	};

	const removeFavoriteMovie = (movieId: number) => {
		setFavoriteMovies((prevFavorites) =>
			prevFavorites.filter((movie) => movie.id !== movieId)
		);
	};

	const isFavorite = (movieId: number) =>
		favoriteMovies.some((movie) => movie.id === movieId);

	const getFavoritesCount = () => favoriteMovies.length;

	const contextValue: FavoriteMoviesContextType = {
		favoriteMovies,
		addFavoriteMovie,
		isFavorite,
		removeFavoriteMovie,
		getFavoritesCount,
	};

	return (
		<FavoriteMoviesContext.Provider value={contextValue}>
			{children}
		</FavoriteMoviesContext.Provider>
	);
}
