/** @format */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { More, AutoAwesome, Favorite, Bookmark } from '@mui/icons-material';

import SearchBar from '../InputEls/SearchBar';
import { useFavoriteMovies } from '../../context-store/favoritesProvider';
import { useSavedMovies } from '../../context-store/savedProvider';
import { Button } from '@mui/material';

export default function PrimaryAppBar(props: {
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	startTransition: React.TransitionStartFunction;
}) {
	const navigate = useNavigate();

	const { getFavoritesCount } = useFavoriteMovies();
	const favoritesCount = getFavoritesCount();
	const { getSavedCount } = useSavedMovies();
	const savedCount = getSavedCount();

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		useState<null | HTMLElement>(null);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton
					href='/discover'
					size='small'
					aria-label='autoawesome / discover'
					color='inherit'>
					<Badge sx={{ mr: 1.9 }}>
						<AutoAwesome />
					</Badge>
					Discover
				</IconButton>
			</MenuItem>
			<MenuItem>
				<IconButton
					href='/favorites'
					size='small'
					aria-label='favourite icon and count'
					color='inherit'>
					<Badge badgeContent={favoritesCount} color='error' sx={{ mr: 1.9 }}>
						<Favorite />
					</Badge>
					Favorites
				</IconButton>
			</MenuItem>
			<MenuItem>
				<IconButton
					href='/saved'
					size='small'
					aria-label='watch later icon and count'
					color='inherit'>
					<Badge badgeContent={savedCount} color='error' sx={{ mr: 1.9 }}>
						<Bookmark />
					</Badge>
					Saved
				</IconButton>
			</MenuItem>
		</Menu>
	);

	return (
		<header>
			<Box sx={{ flexGrow: 1, width: '100%' }}>
				<AppBar position='static' sx={{ width: '100%' }}>
					<Toolbar>
						<Button onClick={() => navigate('/')}>
							<Typography
								variant='h4'
								noWrap
								color='secondary'
								sx={{ display: { xs: 'none', sm: 'block' } }}>
								Movie App
							</Typography>
						</Button>

						<SearchBar
							setSearchTerm={props.setSearchTerm}
							startTransition={props.startTransition}
						/>

						<Box sx={{ flexGrow: 1 }} />
						<Button
							onClick={() => navigate('/discover')}
							sx={{ display: { xs: 'none', sm: 'block' } }}
							size='large'
							aria-label='saved icon and count'
							color='inherit'>
							<Typography variant='h5'>Discover</Typography>
						</Button>
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							<IconButton
								onClick={() => navigate('/saved')}
								size='large'
								aria-label='saved icon and count'
								color='inherit'>
								<Badge badgeContent={savedCount} color='error'>
									<Bookmark fontSize='large' />
								</Badge>
							</IconButton>
							<IconButton
								onClick={() => navigate('/favorites')}
								size='large'
								aria-label='favorite icon and count'
								color='inherit'>
								<Badge badgeContent={favoritesCount} color='error'>
									<Favorite fontSize='large' />
								</Badge>
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size='large'
								aria-label='show more'
								aria-controls={mobileMenuId}
								aria-haspopup='true'
								onClick={handleMobileMenuOpen}
								color='inherit'>
								<More />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
			</Box>
		</header>
	);
}
