/** @format */

import { useSavedMovies } from '../../context-store/savedProvider';
import { MovieGrid } from '../Utils/MovieGrid';
function savedPage() {
	const { savedMovies } = useSavedMovies();

	return <MovieGrid data={savedMovies} />;
}

export default savedPage;
