/** @format */
import axios from 'axios';
import { CssBaseline, Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState, useTransition } from 'react';
import { MovieDetails, MovieInfo } from './models/movie';
import AppBar from './UI-Components/AppBar';
import { MovieGrid, MovieGridSkeleton } from './UI-Components/MovieGrid';
import MoviePage from './UI-Components/MoviePage';
import FavoritesPage from './UI-Components/FavoritesPage';
import SavedPage from './UI-Components/SavedPage';
import { FavoriteMoviesProvider } from './context-store/favoritesProvider';
import { SavedMoviesProvider } from './context-store/savedProvider';

function App() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isPending, startTransition] = useTransition();
	const [data, setData] = useState<Array<MovieDetails | MovieInfo>>([]);
	const [page, setPage] = useState<number>(1);
	const [pageCount, setPageCount] = useState<number>(1);

	useEffect(() => {
		if (searchTerm !== '') {
			startTransition(() => {
				axios
					.get(`http://localhost:8000/search/${searchTerm}`)

					.then((res) => {
						const filteredData = res.data.results.filter(
							(res: MovieInfo) => res.poster_path !== null
						) as MovieInfo[];

						// Check for duplicates before adding to the data
						if (page === 1) setPageCount(res.data.total_pages);

						setData(filteredData);
					})
					.catch((err) => console.log(err));
			});
		}
	}, [searchTerm, page]);

	return (
		<>
			<CssBaseline />

			<SavedMoviesProvider>
				<FavoriteMoviesProvider>
					<AppBar
						setSearchTerm={setSearchTerm}
						startTransition={startTransition}
					/>

					<Box sx={{ flexGrow: 1 }}>
						<Routes>
							<Route
								path='/'
								element={
									isPending ? (
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
							<Route path='/saved' element={<SavedPage />} />
							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
					</Box>
				</FavoriteMoviesProvider>
			</SavedMoviesProvider>
		</>
	);
}

export default App;
