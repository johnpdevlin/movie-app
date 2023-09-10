/** @format */

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
	label: string;
	options: string[];
	selectedValues: string | string[];
	setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
};

function MultipleSelectCheckmarks(props: MultipleSelectCheckmarksProps) {
	const handleChange = (event: SelectChangeEvent<string[]>) => {
		props.setSelectedValues(event.target.value as string[]);
	};

	const selectedValues = Array.isArray(props.selectedValues)
		? props.selectedValues
		: [props.selectedValues];

	return (
		<div>
			<FormControl fullWidth>
				<InputLabel id={`${props.label}-multiple-checkbox-label`}>
					{props.label}
				</InputLabel>
				<Select
					labelId={`${props.label}-multiple-checkbox-label`}
					id={`${props.label}-multiple-checkbox`}
					multiple
					value={selectedValues}
					onChange={handleChange}
					input={<OutlinedInput label={props.label} />}
					renderValue={(selected) =>
						Array.isArray(selectedValues) ? selected.join(', ') : selected
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

export default MultipleSelectCheckmarks;
