/** @format */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SelectEl from '../InputEls/SelectEl';
import {
	Alert,
	Box,
	Button,
	Grid,
	Rating,
	Stack,
	Typography,
} from '@mui/material';
import MultiSelectEl from '../InputEls/MultiSelectEl';
import RangeSlider from '../InputEls/RangeSlider';
import { Check } from '@mui/icons-material';
import { MovieGrid, MovieGridSkeleton } from '../Utils/MovieGrid';
import { MovieDetails, MovieInfo } from '../../models/movie';
import axios from 'axios';

type DisoverPageProps = {
	data: (MovieDetails | MovieInfo)[];
	setSearchParams: React.Dispatch<React.SetStateAction<string>>;
	isPending: boolean;
	page: number;
	pageCount: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
};
function DiscoverPage(props: DisoverPageProps) {
	const years = Array.from(
		{ length: new Date().getFullYear() - 1880 + 1 },
		(_, index) => 1880 + index
	).reverse();
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear() as number
	);
	const [availableGenres, setAvailableGenres] = useState<
		{ name: string; value: number }[]
	>([]);
	const [genres, setGenres] = useState<{ name: string; value: number }[]>([]);
	const [ratingBelow, setRatingBelow] = useState<number>(0);
	const [ratingAbove, setRatingAbove] = useState<number>(0);
	const runtimeRange: [number, number] = [0, 360];
	const [selectedRuntimeRange, setSelectedRuntimeRange] =
		useState<[number, number]>(runtimeRange);

	const handleSubmit = () => {
		const params = [
			selectedYear,
			genres.map((g) => g.value).join(','),
			selectedRuntimeRange[0],
			selectedRuntimeRange[1],
			ratingAbove,
			ratingBelow,
		];

		const queryString = params
			.map((value, index) => {
				if (typeof value === 'string' || typeof value === 'number') {
					const variableName = [
						'primary_release_year',
						'with_genres',
						'with_runtime_gte',
						'with_runtime_lte',
						'vote_average_gte',
						'vote_average_lte',
					][index];
					if (value === '' || value === 0) return '';
					else return `${variableName}=${encodeURIComponent(value)}`;
				}
			})
			.filter(Boolean)
			.join('&');

		props.setSearchParams(queryString);
	};

	useEffect(() => {
		axios
			.get(
				'https://us-central1-movie-app-server-222.cloudfunctions.net/api/genre/list'
			)
			.then((response) => {
				setAvailableGenres(
					response.data.genres.map((gen: { name: string; id: string }) => {
						return { name: gen.name, value: gen.id };
					})
				);
			});
	}, []);

	return (
		<>
			<Grid container>
				<Box width={'100%'}>
					<Alert severity='warning'>
						This page is still under construction!
					</Alert>
				</Box>
				<Grid item xs={5} sm={4} md={2.5} lg={2}>
					<Box m={2} mt={6}>
						<Stack spacing={3}>
							<MultiSelectEl
								label={'Genres'}
								options={availableGenres}
								setSelectedValues={
									setGenres as Dispatch<
										SetStateAction<{ name: string; value: string | number }[]>
									>
								}
							/>

							<SelectEl
								label={'Release Year'}
								options={years.map((y) => {
									return { value: y };
								})}
								selectedValue={selectedYear}
								setSelectedValue={setSelectedYear}
							/>

							<Box>
								<Typography gutterBottom>Runtime (mins):</Typography>
								<RangeSlider
									label={'Runtime'}
									type={'runtime'}
									range={selectedRuntimeRange}
									setRange={setSelectedRuntimeRange}
								/>
							</Box>

							<Stack gap={1}>
								<Box>
									<Typography gutterBottom>Rating (min):</Typography>
									<Rating
										size='large'
										onChange={(e: any) =>
											setRatingAbove(e.target.value as number)
										}
										precision={0.5}
									/>
								</Box>
								<Box>
									<Typography gutterBottom>Rating (max):</Typography>
									<Rating
										size='large'
										onChange={(e: any) => setRatingBelow(e.target.value)}
										precision={0.5}
									/>
								</Box>
							</Stack>
							<Button
								fullWidth
								variant='contained'
								size={'large'}
								endIcon={<Check />}
								onClick={handleSubmit}>
								Filter
							</Button>
						</Stack>
					</Box>
				</Grid>
				<Grid item xs={7} sm={8} md={9.5} lg={10}>
					{props.isPending ? (
						<MovieGridSkeleton />
					) : (
						<MovieGrid
							data={props.data}
							page={props.page}
							pageCount={props.pageCount}
							setPage={props.setPage}
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
}

export default DiscoverPage;
