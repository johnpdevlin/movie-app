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

import MoreIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FavoriteIcon from '@mui/icons-material/Favorite';

import SearchBar from './SearchBar';

export default function PrimaryAppBar(props: {
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
	const navigate = useNavigate();

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
					size='large'
					aria-label='watch later icon and count'
					color='inherit'>
					<Badge badgeContent={17} color='error'>
						<FavoriteIcon />
					</Badge>
				</IconButton>
			</MenuItem>
			<MenuItem>
				<IconButton
					size='large'
					aria-label='watch later icon and count'
					color='inherit'>
					<Badge badgeContent={17} color='error'>
						<WatchLaterIcon />
					</Badge>
				</IconButton>
				<p>Watch Later</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						aria-label='Back Icon'
						color='inherit'
						onClick={() => navigate('..')}>
						<ArrowBackIcon />
					</IconButton>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ display: { xs: 'none', sm: 'block' } }}>
						Movie App
					</Typography>
					<SearchBar setSearchTerm={props.setSearchTerm} />
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton
							size='large'
							aria-label='watch later icon and count'
							color='inherit'>
							<Badge badgeContent={17} color='error'>
								<FavoriteIcon />
							</Badge>
						</IconButton>

						<IconButton
							size='large'
							aria-label='watch later icon and count'
							color='inherit'>
							<Badge badgeContent={17} color='error'>
								<WatchLaterIcon />
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
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
		</Box>
	);
}
