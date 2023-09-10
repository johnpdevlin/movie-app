/** @format */

import React from 'react';
import {
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	Checkbox,
	SelectChangeEvent,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

type MultipleSelectCheckmarksProps = {
	selectRef: React.MutableRefObject<HTMLInputElement | undefined>;
	label: string;
	options: string[];
	value: string | string[];
	onChange: (value: string | string[]) => void;
};

export default function MultipleSelectCheckmarks(
	props: MultipleSelectCheckmarksProps
) {
	const handleChange = (event: SelectChangeEvent<string[]>) => {
		props.onChange(event.target.value);
	};

	const selectedValues = Array.isArray(props.value)
		? props.value
		: [props.value];

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id={`${props.value}-multiple-checkbox-label`}>
					{props.label}
				</InputLabel>
				<Select
					labelId={`${props.value}-multiple-checkbox-label`}
					id={`${props.value}-multiple-checkbox`}
					multiple
					value={selectedValues}
					onChange={handleChange}
					input={<OutlinedInput label={props.label} />}
					renderValue={(selected) =>
						Array.isArray(selected) ? selected.join(', ') : selected
					}
					MenuProps={MenuProps}>
					{props.options.map((option) => (
						<MenuItem key={option} value={option}>
							<Checkbox checked={selectedValues.indexOf(option) > -1} />
							<ListItemText primary={option} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
