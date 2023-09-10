/** @format */

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type TextFieldProps = {
	label: string;
	inputNum: number | undefined;
	setInputNum(value: number | undefined): void;
	error: boolean;
	setError(value: boolean): void;
	type: 'decimal' | 'year'; // Add a condition prop
};

function NumberField(props: TextFieldProps) {
	const validateInput = (inputValue: string) => {
		if (props.type === 'decimal') {
			return !isNaN(parseFloat(inputValue));
		} else if (props.type === 'year') {
			const year = parseInt(inputValue);
			return !isNaN(year) && year >= 1880 && year <= new Date().getFullYear();
		}
		return false;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		// Check if inputValue is valid based on the condition
		const isValid = validateInput(inputValue);

		if (isValid) {
			props.setInputNum(inputValue === '' ? undefined : parseFloat(inputValue));
			props.setError(false);
		} else {
			props.setError(true);
		}
	};

	return (
		<Box
			component='form'
			sx={{
				'& > :not(style)': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete='off'>
			<TextField
				id={`${props.label}-textfield`}
				label={`${props.label}`}
				variant='outlined'
				onChange={handleInputChange}
				error={props.error}
				helperText={
					props.error ? `Please enter a valid ${props.type} input.` : ''
				}
				type='text'
			/>
		</Box>
	);
}

export default NumberField;
