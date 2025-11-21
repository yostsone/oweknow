import React, {JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trip } from '@shared/index';
import TripUsersBoundary from '../../components/TripUsers/TripUsersBoundary';
import TripBillsBoundary from "../../components/TripBills/TripBillsBoundary";
const errorMessage = 'Failed to fetch trip';

const TripPage = () => {
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
      <section>
        <header>
          <h2>{ name }</h2>
          <p>{location}, {year}</p>
        </header>
        <section>
          <h3>Group members</h3>
          <TripUsersBoundary tripId={id} />
        </section>
        <section>
          <h3>Group bills</h3>
          <TripBillsBoundary tripId={id}/>
        </section>
      </section>
  );
};

export default TripPage;
