import React, { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { User } from '@shared/index';

const errorMessage = 'Failed to fetch users';

type TripUsersProps = {
  id: string;
};

const fetchUsers = async (id: string): Promise<User[]> => {
  const res = await fetch(`http://localhost:5000/api/users/${id}`);

  if (!res.ok) {
    throw new Error(errorMessage);
  }
  return res.json();
};

const TripUsersContent: React.FC<TripUsersProps> = ({ id }) => {
  const { data: users } = useSuspenseQuery({
    queryKey: ['users', id],
    queryFn: () => fetchUsers(id)
  });

  if (!users.length) {
    return <div>No users found.</div>;
  }
  return (
      <div>
        <h3>Users:</h3>
        <ul>
          {users.map((user) => (
              <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
  );
};

const TripUsers: React.FC<TripUsersProps> = ({ id }) => (
    <Suspense fallback={<div>Loading users...</div>}>
      <TripUsersContent id={id} />
    </Suspense>
);

export default TripUsers;