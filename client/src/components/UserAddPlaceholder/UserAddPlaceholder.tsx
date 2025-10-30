import React, { useState, Suspense } from 'react';
import { Chip, CircularProgress } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
type TripUsersProps = {
  id: string;
};

const UserAddPlaceholder:React.FC<TripUsersProps> = ({id}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <li key="placeholder-user">
        <Chip
          avatar={<AddCircleIcon sx={{ color: 'primary.light' }} />}
          label="Add"
          variant="filled"
          onClick={()=> { setIsOpen(true); }  }
        />
      </li>
    </>
  );
}
export default UserAddPlaceholder;