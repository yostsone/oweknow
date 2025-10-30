import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

const Header:React.FC = () => {
  return (
    <AppBar position="static" sx={{
      bgcolor: 'background.paper',
      color: 'text.primary',
    }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <h1>[oʊ noʊ]</h1>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
