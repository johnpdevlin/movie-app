/** @format */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import MovieCompact from './MovieCompact';
import Pagination from '@mui/material/Pagination';
import { MovieDetails, MovieInfo } from '../models/movie';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';

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
			</>
		</>
	);
}

function MovieGridSkeleton() {
	return (
		<Grid container mt={3} gap={1.5} justifyContent='flex'>
			{Array.from(new Array(20)).map((_, index) => {
				return (
					<>
						<Grid item xs={3.6} sm={2.8} md={1.8} lg={1.6} key={index}>
							<Skeleton variant='rectangular' width='100%' height={300} />
						</Grid>
						<Skeleton variant='text' />
					</>
				);
			})}
		</Grid>
	);
}
export { MovieGrid, MovieGridSkeleton };
