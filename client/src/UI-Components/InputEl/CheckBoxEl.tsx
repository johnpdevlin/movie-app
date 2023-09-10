/** @format */

import Checkbox from '@mui/material/Checkbox';

type CheckBoxProps = {
	value: string;
	label: string;
	checked: boolean;
	setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};
function ControlledCheckbox(props: CheckBoxProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setChecked(event.target.checked);
	};

	return (
		<Checkbox
			id={`${props.value}-checkbox`}
			checked={props.checked}
			onChange={handleChange}
			inputProps={{ 'aria-label': `${props.label}` }}
		/>
	);
}

export default ControlledCheckbox;
