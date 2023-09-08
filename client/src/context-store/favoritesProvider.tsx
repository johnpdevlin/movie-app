/** @format */

import { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'; // Import useLocalStorage hook
import { MovieDetails } from '../models/movie'; // Import MovieDetails model

// Create a context
type FavoriteMoviesContextType = {
	favoriteMovies: MovieDetails[];
	addFavoriteMovie: (movie: MovieDetails) => void;
	removeFavoriteMovie: (movieId: number) => void;
	getFavoritesCount: () => number; // Add getFavoritesCount function
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

	const addFavoriteMovie = (movie: MovieDetails) => {
		setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
	};

	const removeFavoriteMovie = (movieId: number) => {
		setFavoriteMovies((prevFavorites) =>
			prevFavorites.filter((movie) => movie.id !== movieId)
		);
	};

	const getFavoritesCount = () => favoriteMovies.length; // Implement getFavoritesCount

	const contextValue: FavoriteMoviesContextType = {
		favoriteMovies,
		addFavoriteMovie,
		removeFavoriteMovie,
		getFavoritesCount, // Include getFavoritesCount in the context
	};

	return (
		<FavoriteMoviesContext.Provider value={contextValue}>
			{children}
		</FavoriteMoviesContext.Provider>
	);
}
