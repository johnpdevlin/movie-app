/** @format */
import axios from 'axios';
import { CssBaseline, Box } from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState, useTransition } from 'react';
import { MovieDetails, MovieInfo } from './models/movie';
import AppBar from './Components/Utils/AppBar';
import { MovieGrid, MovieGridSkeleton } from './Components/Utils/MovieGrid';
import MoviePage from './Components/Pages/MoviePage';
import FavoritesPage from './Components/Pages/FavoritesPage';
import SavedPage from './Components/Pages/SavedPage';
import { FavoriteMoviesProvider } from './context-store/favoritesProvider';
import { SavedMoviesProvider } from './context-store/savedProvider';
import DiscoverPage from './Components/Pages/DiscoverPage';

function App() {
	const location = useLocation();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchParams, setSearchParams] = useState<string>('');
	const [isPending, startTransition] = useTransition();
	const [data, setData] = useState<Array<MovieDetails | MovieInfo>>(() => []);
	const [page, setPage] = useState<number>(() => 1);
	const [pageCount, setPageCount] = useState<number>(1);

	useEffect(() => {
		if (searchTerm !== '' || searchParams !== '') {
			startTransition(() => {
				const query = `${searchParams !== '' ? 'discover?' : 'search/'}${
					searchTerm || searchParams
				}&page=${page}`;

				axios
					.get(
						`https://us-central1-movie-app-server-222.cloudfunctions.net/api/${query}`
					)

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
	}, [searchTerm, searchParams, page]);

	useEffect(() => {
		setSearchParams('');
		setSearchTerm('');
		setPageCount(0);
		setData([]);
	}, [location]);

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
							<Route
								path='/discover'
								element={
									<DiscoverPage
										setSearchParams={setSearchParams}
										data={data}
										isPending={isPending}
										page={page}
										pageCount={pageCount}
										setPage={setPage}
									/>
								}
							/>
							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
					</Box>
				</FavoriteMoviesProvider>
			</SavedMoviesProvider>
		</>
	);
}

export default App;
