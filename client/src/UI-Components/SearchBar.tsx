/** @format */

import { useRef, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';

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
	startTransition: React.TransitionStartFunction;
}) {
	const inputRef = useRef<HTMLInputElement>();
	const [inputText, setInputText] = useState<string>('');
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (inputText === inputRef.current?.value && inputText.trim() !== '') {
			props.setSearchTerm(inputText);
			if (location.pathname !== '/') navigate('/');
		}
	}, [inputText]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.startTransition(() => {
			setTimeout(() => setInputText(e.target.value), 1850);
		});
	};
	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputRef.current!.value.trim() !== '') {
			if (location.pathname !== '/') navigate('/');
			props.setSearchTerm(inputRef.current!.value);
		}
	};

	return (
		<>
			<form onSubmit={handleSearchSubmit}>
				<Search>
					<StyledInputBase
						placeholder='Search…'
						inputProps={{ 'aria-label': 'search' }}
						inputRef={inputRef}
						onChange={handleSearchChange}
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
