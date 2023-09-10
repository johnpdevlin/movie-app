/** @format */

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

type RangeSliderProps = {
	label: string;
	type: 'year' | 'runtime';
	range: [number, number];
	setRange: React.Dispatch<React.SetStateAction<[number, number]>>;
};

export default function RangeSlider(props: RangeSliderProps) {
	const handleChange = (_event: Event, newValue: number | number[]) => {
		props.setRange(newValue as [number, number]);
	};
	let min: number = 0;
	let max: number = 100;

	if (props.type === 'year') [min, max] = [1880, new Date().getFullYear()];
	else if (props.type === 'runtime') [min, max] = [0, 360];

	return (
		<Box>
			<Slider
				getAriaLabel={() => props.label}
				value={props.range}
				onChange={handleChange}
				valueLabelDisplay='auto'
				min={min}
				max={max}
			/>
		</Box>
	);
}
