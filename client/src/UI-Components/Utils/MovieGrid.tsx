/** @format */
import { useId } from 'react';
import MovieCompact from './MovieCompact';
import { Pagination, Skeleton, Box, Grid } from '@mui/material';
import { MovieDetails, MovieInfo } from '../../models/movie';
import '../../styles/fadein.css';

function MovieGrid(props: {
	data: (MovieInfo | MovieDetails)[];
	page?: number;
	setPage?: React.Dispatch<React.SetStateAction<number>>;
	pageCount?: number;
}) {
	function handlePageChange(
		_event: React.ChangeEvent<unknown>,
		page: number
	): void {
		if (props.setPage !== undefined) {
			props.setPage(page);
		}
	}
	return (
		<>
			<Box my={6} mx={4}>
				<Grid container spacing={1.5} justifyContent='flex'>
					{props.data.map((info: MovieInfo | MovieDetails, index) => {
						return (
							<Grid item xs={6} sm={4} md={3} lg={2.4} key={info.id}>
								<div className='fade-in'>
									<MovieCompact
										id={info.id}
										poster={info.poster_path!}
										title={info.title}
										release_date={info.release_date}
										key={index}
									/>
								</div>
							</Grid>
						);
					})}
				</Grid>

				{props?.pageCount! > 1 ? (
					<Box
						sx={{
							textAlign: 'center',
							display: 'flex',
							justifyContent: 'center',
							m: 5,
						}}>
						<Pagination
							page={props.page}
							count={props.pageCount}
							color='secondary'
							onChange={handlePageChange}
						/>
					</Box>
				) : null}
			</Box>
		</>
	);
}

function MovieGridSkeleton() {
	return (
		<Grid container mt={3} spacing={1.5} display='flex'>
			{Array.from(new Array(20)).map(() => {
				return (
					<Grid item xs={6} sm={4} md={3} lg={2.4} key={useId()}>
						<div className='fade-in'>
							<Skeleton
								variant='rectangular'
								width='100%'
								height={320}
								animation='wave'
							/>
						</div>
					</Grid>
				);
			})}
		</Grid>
	);
}
export { MovieGrid, MovieGridSkeleton };
