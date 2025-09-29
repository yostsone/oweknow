import React, { useEffect, useState } from 'react';
import { Trip } from '@shared/index';

const App: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/trips')
        .then(res => res.json())
        .then((data: Trip[]) => setTrips(data));
  }, []);

  return (
      <div>
        <h1>Trips</h1>
        <ul>
          {trips.map((trip) => (
              <li key={trip.id}>
                {trip.name} ({trip.year})
              </li>
          ))}
        </ul>
      </div>
  );
};

export default App;
