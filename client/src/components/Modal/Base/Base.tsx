import React from 'react';
import { Box, Container, Modal, Typography } from '@mui/material';
import { modalWrapper, childrenWrapper } from './BaseStyles';

type ModalBaseProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  children: React.ReactNode;
  title: string;
}

const Base:React.FC<ModalBaseProps> = ({ isOpen, onClose, children, title }) => {
  return (
    <Modal open={isOpen} onClose={() => onClose(false)}>
      <Box component="section" sx={modalWrapper}>
        <Container maxWidth="md" sx={childrenWrapper}>
          <Container>
            <Typography variant="h5">
              { title }
            </Typography>
          </Container>
          <Container sx={childrenWrapper}>
            { children }
          </Container>
        </Container>
      </Box>
    </Modal>
  );
}
export default Base;