/** @format */
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AppBar from './UI-Components/AppBar';
import { MovieGrid, MovieGridSkeleton } from './UI-Components/MovieGrid';
import { MovieDetails, MovieInfo } from './models/movie';
import MoviePage from './UI-Components/MoviePage';
import FavoritesPage from './UI-Components/FavoritesPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { FavoriteMoviesProvider } from './context-store/favoritesProvider';

function App() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<Array<MovieDetails | MovieInfo>>([]);
	const [page, setPage] = useState<number>(1);
	const [pageCount, setPageCount] = useState<number>(1);

	useEffect(() => {
		if (searchTerm !== '') {
			setIsLoading(true);

			axios
				.get(
					`https://us-central1-movie-app-server-222.cloudfunctions.net/api/search/${searchTerm}&page=${page}`
				)

				.then((res) => {
					const filteredData = res.data.results.filter(
						(res: MovieInfo) => res.poster_path !== null
					) as MovieInfo[];

					// Check for duplicates before adding to the data
					if (page === 1) setPageCount(res.data.total_pages);

					setData(filteredData);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [searchTerm, page]);

	return (
		<>
			<CssBaseline />

			<FavoriteMoviesProvider>
				<AppBar setSearchTerm={setSearchTerm} />
				<main>
					<Box sx={{ mx: 5 }}>
						<Routes>
							<Route
								path='/'
								element={
									isLoading ? (
										<MovieGridSkeleton />
									) : (
										<MovieGrid
											data={data}
											page={page}
											pageCount={pageCount}
											setPage={setPage}
										/>
									)
								}
							/>
							<Route path='/:id' element={<MoviePage />} />
							<Route path='/favorites' element={<FavoritesPage />} />
							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
					</Box>
				</main>
			</FavoriteMoviesProvider>
		</>
	);
}

export default App;
