/** @format */

import { useEffect, useState } from 'react';
import AppBar from './UI-Components/AppBar';
import MovieGrid from './UI-Components/MovieGrid';
import { MovieDetails, MovieInfo } from '../models/movie';
import axios from 'axios';
import MoviePage from './UI-Components/MoviePage';
import FavoritesPage from './UI-Components/FavoritesPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { FavoriteMoviesProvider } from './context/favoritesContext';

function App() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<Array<MovieDetails | MovieInfo>>([]);

	useEffect(() => {
		if (searchTerm !== '') {
			setIsLoading(true);

			axios
				.get(`http://localhost:8000/search/${searchTerm}`)

				.then((res) => {
					console.log(res);
					const filteredData = res.data.results.filter(
						(res: MovieInfo) => res.poster_path !== null
					) as MovieInfo[];

					// Check for duplicates before adding to the data

					setData(filteredData);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [searchTerm]);

	return (
		<>
			<FavoriteMoviesProvider>
				<AppBar setSearchTerm={setSearchTerm} />
				<Routes>
					<Route
						path='/'
						element={<MovieGrid isLoading={isLoading} data={data} />}
					/>
					<Route path='/:id' element={<MoviePage />} />
					<Route path='/favorites' element={<FavoritesPage />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</FavoriteMoviesProvider>
		</>
	);
}

export default App;
