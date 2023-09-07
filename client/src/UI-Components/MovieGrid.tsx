/** @format */

import Grid from '@mui/material/Grid';
import MovieCompact from './MovieCompact';
import { MovieInfo } from '../../models/movie';

// import MovieCompact from './MovieCompact';

const MovieGrid = (props: { isLoading: Boolean; data: MovieInfo[] }) => {
	return (
		<>
			{props.isLoading ? (
				<p>Loading...</p>
			) : (
				<Grid container gap={1.5}>
					{props.data.map((info: MovieInfo, index) => {
						return (
							<>
								<Grid item xs={6} sm={4} md={3} key={index}>
									<MovieCompact
										id={info.id}
										poster={info.poster_path}
										title={info.title}
										release_date={info.release_date}
									/>
								</Grid>
							</>
						);
					})}
				</Grid>
			)}
		</>
	);
};

export default MovieGrid;
