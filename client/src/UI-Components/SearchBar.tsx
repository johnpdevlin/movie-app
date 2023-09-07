/** @format */

import React, { useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

function SearchAppBar(props: {
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
	const searchTextRef = useRef<HTMLInputElement>(null);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTextRef.current) {
			const inputValue = searchTextRef.current.value;
			props.setSearchTerm(inputValue);
		}
	};

	return (
		<>
			<form onSubmit={handleSearchSubmit}>
				<Search>
					<StyledInputBase
						placeholder='Search…'
						inputProps={{ 'aria-label': 'search' }}
						inputRef={searchTextRef}
					/>
				</Search>
			</form>
			<IconButton
				aria-label='Search'
				color='secondary'
				onClick={handleSearchSubmit}>
				<SearchIcon />
			</IconButton>
		</>
	);
}

export default SearchAppBar;
