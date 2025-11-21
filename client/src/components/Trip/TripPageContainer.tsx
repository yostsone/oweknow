import TripUsersBoundary from '../../components/TripUsers/TripUsersBoundary';
import TripBillsBoundary from '../../components/TripBills/TripBillsBoundary';
import { useTripQuery } from '../../hooks/trip/useTripQuery';

const TripPageContainer = () => {
  const { data: { id, year, name, location } } = useTripQuery();

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

export default TripPageContainer;
