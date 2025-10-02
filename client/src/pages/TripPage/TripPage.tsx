import React, {JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trip } from '@shared/index';
import TripUsers  from '../../components/TripUsers/TripUsers';
const errorMessage = 'Failed to fetch trip';

const TripPage:React.FC = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState<Omit<Trip, 'id'> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/trip/${id}`);
        if (!res.ok)  {
          setError(errorMessage);
          throw new Error(errorMessage);
        }
        const data: Trip = await res.json();
        setTrip(data);
      } catch (error) {
        setError(errorMessage);
      }
    };
    fetchTrip();
  }, [id]);

  if (!trip || !id) {
    return <div>{error}</div>;
  }

  const { year, name, location } = trip;
  return (
      <div>
        <div>
          <h1>{name}</h1>
          <p>Year: {year}</p>
          <p>Location: {location}</p>
        </div>
        <div>
          <h2>Users on this trip:</h2>
          <TripUsers id={id} />
        </div>
      </div>
  );
};

export default TripPage;
