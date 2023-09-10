/** @format */

import Box from '@mui/material/Box';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

type BasicSelectProps = {
	selectRef: React.MutableRefObject<HTMLInputElement | undefined>;
	label: string;
	options: { label: string; value: string }[];
};

function BasicSelect(props: BasicSelectProps) {
	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id='simple-select-label'>{props.label}</InputLabel>
				<Select
					labelId={`${props.label}-select-label`}
					id={`${props.label}-select-label`}
					ref={props.selectRef}
					label='Age'>
					{props.options.map((option) => (
						<MenuItem value={option.value} key={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}

export default BasicSelect;
