/** @format */

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function MovieRating(props: { value: number }) {
	return (
		<>
			<Stack direction='row' alignItems='center'>
				<Rating defaultValue={props.value} precision={0.1} readOnly />
				<small>({props.value.toFixed(1)})</small>
			</Stack>
		</>
	);
}
