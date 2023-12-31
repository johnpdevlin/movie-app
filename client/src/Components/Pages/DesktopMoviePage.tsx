/** @format */
/** @format */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CalculateIcon from '@mui/icons-material/Calculate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import MovieRating from '../Utils/MovieRating';

import Tooltip from '@mui/material/Tooltip';
import {
	formatMinutesToHoursAndMinutes,
	formatDollarsToCompact,
} from '../../utils/format';

import { MovieDetails } from '../../models/movie';
import { Grid, IconButton, Skeleton } from '@mui/material';
import {
	AddCircleTwoTone,
	CheckCircleTwoTone,
	Favorite,
	FavoriteTwoTone,
} from '@mui/icons-material';

type MoviePageProps = {
	movie: MovieDetails | undefined;
	isFavorite: (id: number) => Boolean;
	toggleFavorite: () => void;
	isSaved: (id: number) => Boolean;
	toggleSaved: () => void;
};

function DesktopMoviePage({
	movie,
	isFavorite,
	toggleFavorite,
	isSaved,
	toggleSaved,
}: MoviePageProps) {
	return (
		<>
			<Stack direction={'column'}>
				<Card
					sx={{
						display: 'flex',
						maxWidth: '90%',
						textAlign: 'center',
						justifyContent: 'center',
						m: 5,
					}}>
					<CardMedia
						component='img'
						sx={{ width: 351 }}
						image={`https://image.tmdb.org/t/p/w300/${movie?.poster_path}`}
						alt={movie?.title}
					/>

					<Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Stack
								direction='row'
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>
								<Stack
									direction='row'
									spacing={2}
									sx={{ alignItems: 'center' }}>
									<Typography variant='h2'>{movie?.title}</Typography>
									<Typography variant='subtitle1' color='text.secondary'>
										{movie?.release_year}
									</Typography>
								</Stack>
								<Stack
									direction={'row'}
									spacing={1}
									margin={2}
									right={0}
									top={0}>
									{isSaved(movie?.id as number) ? (
										<IconButton onClick={toggleSaved}>
											<CheckCircleTwoTone fontSize='large' />
										</IconButton>
									) : (
										<IconButton onClick={toggleSaved}>
											<AddCircleTwoTone fontSize='large' />
										</IconButton>
									)}
									{isFavorite(movie?.id as number) ? (
										<IconButton onClick={toggleFavorite}>
											<Favorite fontSize='large' />
										</IconButton>
									) : (
										<IconButton onClick={toggleFavorite}>
											<FavoriteTwoTone fontSize='large' />
										</IconButton>
									)}
								</Stack>
							</Stack>
							{movie?.vote_average ? (
								<Box sx={{ my: 1.5 }}>
									<MovieRating value={movie?.vote_average!} />
								</Box>
							) : null}
							{movie?.overview ? (
								<Box sx={{ m: 3 }}>
									<Typography variant='body1' textAlign={'justify'}>
										{movie?.overview}
									</Typography>
								</Box>
							) : null}
							<Stack gap={1}>
								{movie?.original_language ? (
									<Stack direction='row' gap={1.5}>
										<Tooltip title='Language'>
											<LanguageIcon />
										</Tooltip>
										{movie?.original_language}
									</Stack>
								) : null}
								{movie?.runtime ? (
									<Stack direction='row' gap={1.5}>
										<Tooltip title='Runtime'>
											<AccessTimeIcon />
										</Tooltip>

										{movie?.runtime
											? formatMinutesToHoursAndMinutes(movie.runtime)
											: 'unknown'}
									</Stack>
								) : null}
								{movie?.revenue ? (
									<Stack direction='row' gap={1.5}>
										<Tooltip title='Revenue'>
											<AttachMoneyIcon />
										</Tooltip>
										{movie?.revenue
											? formatDollarsToCompact(movie.revenue)
											: 'unknown'}
									</Stack>
								) : null}
								{movie?.budget ? (
									<Stack direction='row' gap={1.5}>
										<Tooltip title='Budget'>
											<CalculateIcon />
										</Tooltip>
										{movie?.budget
											? formatDollarsToCompact(movie!.budget)
											: 'unknown'}
									</Stack>
								) : null}
								{movie?.profit ? (
									<Stack direction='row' gap={1.5}>
										<Tooltip title='Profit'>
											<ShowChartIcon />
										</Tooltip>
										{movie?.profit
											? formatDollarsToCompact(movie.profit)
											: 'unknown'}
									</Stack>
								) : null}
								{movie?.production_companies ? (
									<Stack direction='row' gap={1.5}>
										<Tooltip title='Production Companies'>
											<BusinessIcon />
										</Tooltip>
										{movie?.production_companies.map((comp, index) => {
											if (index === movie.production_companies.length - 1) {
												return comp.name;
											}
											return comp.name + ', ';
										})}
									</Stack>
								) : null}
							</Stack>
							{movie?.genres ? (
								<Stack direction='row' spacing={1} sx={{ mt: 2, mb: 1 }}>
									{movie?.genres.map((gen) => {
										return <Chip label={gen.name} key={gen.id} />;
									})}
								</Stack>
							) : null}
						</CardContent>
					</Box>
				</Card>
			</Stack>
		</>
	);
}

export function DesktopMovieSkeleton() {
	return (
		<Box alignContent={'center'}>
			<Grid item md={3} spacing={2}>
				<Skeleton
					animation='pulse'
					variant='rectangular'
					width='100%'
					height={500}
				/>
			</Grid>
			<Grid item md={4}>
				<Skeleton animation='pulse' width='80%' />
				<Skeleton animation='pulse' variant='text' />
				<Skeleton animation='pulse' variant='text' />
				<Skeleton animation='pulse' variant='text' />
				<Skeleton animation='pulse' variant='text' />
				<Skeleton animation='pulse' variant='text' />
			</Grid>
		</Box>
	);
}

export default DesktopMoviePage;
