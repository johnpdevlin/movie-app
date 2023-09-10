/** @format */

import { useFavoriteMovies } from '../../context-store/favoritesProvider';
import { MovieGrid } from '../Utils/MovieGrid';
function FavoritesPage() {
	const { favoriteMovies } = useFavoriteMovies();

	return <MovieGrid data={favoriteMovies} />;
}

export default FavoritesPage;
