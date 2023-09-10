/** @format */

import { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'; // Import useLocalStorage hook
import { MovieDetails } from '../models/movie'; // Import MovieDetails model
import axios from 'axios';

// Create a context
type SavedMoviesContextType = {
	savedMovies: MovieDetails[];
	addSavedMovie: (movie: MovieDetails) => void;
	isSaved: (movieId: number) => boolean;
	removeSavedMovie: (movieId: number) => void;
	getSavedCount: () => number;
};

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(
	undefined
);

type SavedMoviesProviderProps = {
	children: ReactNode;
};

export function useSavedMovies() {
	const context = useContext(SavedMoviesContext);
	if (!context) {
		throw new Error('useSavedMovies must be used within a SavedMoviesProvider');
	}
	return context;
}

export function SavedMoviesProvider({ children }: SavedMoviesProviderProps) {
	const [savedMovies, setSavedMovies] = useLocalStorage<MovieDetails[]>(
		'savedMovies',
		[]
	);

	const addSavedMovie = (movie: MovieDetails | number) => {
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
					addSavedMovie(movieDetails);
				})
				.catch((error) => {
					// Handle errors if necessary
					console.error('Error fetching movie details:', error);
				});
		} else {
			setSavedMovies((prevSaved) => [...prevSaved, movie]);
		}
	};

	const removeSavedMovie = (movieId: number) => {
		setSavedMovies((prevSaved) =>
			prevSaved.filter((movie) => movie.id !== movieId)
		);
	};

	const isSaved = (movieId: number) =>
		savedMovies.some((movie) => movie.id === movieId);

	const getSavedCount = () => savedMovies.length;

	const contextValue: SavedMoviesContextType = {
		savedMovies,
		addSavedMovie,
		isSaved,
		removeSavedMovie,
		getSavedCount,
	};

	return (
		<SavedMoviesContext.Provider value={contextValue}>
			{children}
		</SavedMoviesContext.Provider>
	);
}
