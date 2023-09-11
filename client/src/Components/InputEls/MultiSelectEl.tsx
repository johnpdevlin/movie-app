/** @format */

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

type MultiSelectProps = {
	label: string;
	options: { name?: string; value: string | number }[];
	setSelectedValues: React.Dispatch<
		React.SetStateAction<
			{
				name: string;
				value: number | string;
			}[]
		>
	>;
};

export default function MultipleSelectCheckmarks(props: MultiSelectProps) {
	const optionNames = props.options.map((option) =>
		option.name ? option.name : option.value
	);

	const [selectedEl, setSelectedEl] = React.useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof selectedEl>) => {
		const {
			target: { value },
		} = event;
		setSelectedEl(typeof value === 'string' ? value.split(',') : value);
		const values = props.options.filter(
			(option) => option.name && selectedEl.includes(option?.name)
		) as {
			name: string;
			value: number | string;
		}[];
		props.setSelectedValues(values);
	};

	return (
		<>
			<FormControl sx={{ m: 1 }}>
				<InputLabel id={`${props.label}-multiple-checkbox-label`}>
					{props.label}
				</InputLabel>
				<Select
					labelId={`${props.label}-multiple-checkbox-label`}
					id={`${props.label}-multiple-checkbox`}
					multiple
					value={selectedEl}
					onChange={handleChange}
					input={<OutlinedInput />}
					renderValue={(selected) => selected.join(', ')}
					MenuProps={MenuProps}>
					{optionNames.map((name) => (
						<MenuItem key={name} value={name}>
							<Checkbox checked={selectedEl.indexOf(name.toString()) > -1} />
							<ListItemText primary={name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
}
