/** @format */

import Box from '@mui/material/Box';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

type BasicSelectProps = {
	selectedValue: number | string | null;
	setSelectedValue: React.Dispatch<React.SetStateAction<number | null>>;
	label: string;
	options: { label?: string; value: string | number }[];
};

function BasicSelect(props: BasicSelectProps) {
	const handleValueChange = (e: any) => {
		props.setSelectedValue(e.target.value);
	};
	return (
		<Box>
			<FormControl fullWidth>
				<InputLabel id='select-label'>{props.label}</InputLabel>
				<Select
					placeholder='Release Year'
					labelId={`${props.label}-select-label`}
					id={`${props.label}-select-label`}
					value={props.selectedValue}
					onChange={handleValueChange}
					label={props.label}>
					{props.options.map((option) => (
						<MenuItem value={option.value} key={option.value}>
							{option.label ? option.label : option.value}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}

export default BasicSelect;
