/** @format */

import { useFavoriteMovies } from '../context/favoritesContext';
import MovieGrid from './MovieGrid';
function FavoritesPage() {
	const { favoriteMovies } = useFavoriteMovies();

	return <MovieGrid data={favoriteMovies} isLoading={false} />;
}

export default FavoritesPage;
