/** @format */

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

type SwitchLabelsProps = {
	label: string;
	checked: boolean;
	setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SwitchLabels(props: SwitchLabelsProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setChecked(event.target.checked);
	};

	return (
		<FormControlLabel
			control={<Switch checked={props.checked} onChange={handleChange} />}
			label={props.label}
		/>
	);
}
