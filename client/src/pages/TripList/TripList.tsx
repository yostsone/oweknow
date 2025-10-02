import React, { JSX, useEffect, useState } from 'react';
import { Trip } from '@shared/index';
import { Link } from 'react-router-dom';

const TripList: () => JSX.Element = () => {
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
                <Link to={`/trip/${trip.id}`}>{trip.name}</Link>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default TripList;
