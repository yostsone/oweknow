import React from 'react';
import { Box} from '@mui/material';

const Footer:React.FC = () => {
  return (
      <Box component="footer" sx={{
        mt: 'auto',
        bgcolor: 'background.paper',
        p: 2,
        textAlign: 'center',
      }}>
        2025
      </Box>
  );
};

export default Footer;
