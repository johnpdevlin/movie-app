/** @format */
export function formatDollarsToCompact(number: number): string {
	if (number >= 1e9) {
		return (
			'$' +
			new Intl.NumberFormat('en-US', {
				notation: 'compact',
				compactDisplay: 'short',
			}).format(number / 1e9) +
			'b'
		);
	} else if (number >= 1e6) {
		return (
			'$' +
			new Intl.NumberFormat('en-US', {
				notation: 'compact',
				compactDisplay: 'short',
			}).format(number / 1e6) +
			'm'
		);
	} else if (number >= 1e3) {
		return (
			'$' +
			new Intl.NumberFormat('en-US', {
				notation: 'compact',
				compactDisplay: 'short',
			}).format(number / 1e3) +
			'k'
		);
	} else {
		return '$' + number.toString();
	}
}

export function formatMinutesToHoursAndMinutes(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	if (hours > 0) {
		if (remainingMinutes > 0) {
			return `${hours}h ${remainingMinutes}`;
		} else {
			return `${hours}h`;
		}
	} else {
		return `${remainingMinutes}mins`;
	}
}
export function formatStringWithColon(
	inputString: string
): JSX.Element | string {
	if (inputString.includes(':')) {
		const [part1, part2] = inputString.split(':');
		return (
			<>
				{part1}:<br />
				{part2}
			</>
		);
	} else {
		return inputString;
	}
}
