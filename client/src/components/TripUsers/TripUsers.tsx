import React, { Suspense, useState, lazy } from 'react';
import { User } from '@shared/index';
import { useUsers } from '../../hooks/useUsers';
import {Avatar, Chip, CircularProgress, Stack} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ModalAddUser = lazy(() => import('../Modal/AddEditUser/AddEditUser'));

type CurrentUserType = {
  tripId: string;
  user: User | null;
}
type TripUsersProps = { tripId: string };
const TripUsers = ({ tripId }: TripUsersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserData, setCurrentUserData] = useState<CurrentUserType>({tripId: tripId, user: null});
  const { data: usersRaw } = useUsers(tripId);
  const users: User[] = usersRaw ?? [];

  const handleUserModalData = (isPlaceholder:boolean, user: User | null) => {
    setIsOpen(true);
    if (isPlaceholder) {
      setCurrentUserData({tripId: tripId, user: null});
    } else {
      setCurrentUserData({tripId: tripId, user});
    }
  }

  return (
    <section>
      <Stack component="ul" direction="row" useFlexGap spacing={1} sx={{ flexWrap: 'wrap' }}>
        {users.length > 0 && users.map((user) => (
          <li key={user.id}>
            <Chip
              avatar={
                <Avatar
                  alt={user.name}
                  src="/static/images/avatar/1.jpg"
                  sx={{ bgcolor: 'primary.light', color: 'primary.light' }}
                />
              }
              label={user.name}
              variant="filled"
              onClick={() => handleUserModalData(false, user) }
            />
          </li>
        ))}
        <li key="placeholder-user">
          <Chip
            avatar={<AddCircleIcon sx={{ color: 'primary.light' }} />}
            label="Add"
            variant="filled"
            onClick={()=> handleUserModalData(true, null) }
          />
        </li>
      </Stack>
      {isOpen && (
          <Suspense fallback={<CircularProgress color="secondary" />}>
            <ModalAddUser isOpen={isOpen} onClose={() => setIsOpen(false)} currentUserData={currentUserData}/>
          </Suspense>
      )}
    </section>
  );
};

export default TripUsers;