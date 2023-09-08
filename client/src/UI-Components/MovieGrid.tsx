/** @format */

import Grid from '@mui/material/Grid';
import MovieCompact from './MovieCompact';
import Skeleton from '@mui/material/Skeleton';
import { MovieDetails, MovieInfo } from '../../models/movie';

function MovieGrid(props: {
	isLoading: Boolean;
	data: (MovieInfo | MovieDetails)[];
}) {
	return (
		<>
			{props.isLoading ? (
				<Grid container mt={3} gap={1.5} justifyContent='flex'>
					{Array.from(new Array(20)).map((_, index) => {
						return (
							<>
								<Grid item xs={3.6} sm={2.8} md={1.8} lg={1.6} key={index}>
									<Skeleton variant='rectangular' width='100%' height={300} />
								</Grid>
							</>
						);
					})}
				</Grid>
			) : (
				<>
					<Grid container mt={3} gap={1.5} justifyContent='flex'>
						{props.data.map((info: MovieInfo | MovieDetails, index) => {
							return (
								<>
									<Grid item xs={3.6} sm={2.8} md={1.8} lg={1.6} key={index}>
										<MovieCompact
											id={info.id}
											poster={info.poster_path!}
											title={info.title}
											release_date={info.release_date}
											key={index}
										/>
									</Grid>
								</>
							);
						})}
					</Grid>
				</>
			)}
		</>
	);
}
export default MovieGrid;
