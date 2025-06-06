import React, { useState } from 'react';
import {
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import * as dropdownData from './data';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

import { IconBellRinging } from '@tabler/icons';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl2 ? 'primary.main' : 'text.secondary',
        }}
        onClick={handleClick2}
      >
        <Badge variant="dot" color="primary">
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Stack direction="row" py={2} px={4} justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Thông bảo</Typography>
          <Chip label="1 thông báo mới" color="primary" size="small" />
        </Stack>
        <Scrollbar sx={{ height: '385px' }}>
          {dropdownData.notifications.map((notification, index) => (
            <Link to="/donate" key={index}>
              <Box>
                <MenuItem sx={{ py: 2, px: 4 }}>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      src={notification.avatar}
                      alt={notification.avatar}
                      sx={{
                        width: 48,
                        height: 48,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="textPrimary"
                        fontWeight={600}
                        noWrap
                        sx={{
                          width: '240px',
                        }}
                      >
                        {notification.title}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        sx={{
                          width: '240px',
                        }}
                        noWrap
                      >
                        {notification.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </MenuItem>
              </Box>
            </Link>
          ))}
        </Scrollbar>
        <Box p={3} pb={1}>
          <Button to="/donate" variant="outlined" component={Link} color="primary" fullWidth>
            Ủng Hộ Tác Giả
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Notifications;
