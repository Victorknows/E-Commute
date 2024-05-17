import React from 'react';

const TripList = ({ trips }) => {
  return (
    <div>
      <h3>Logged Trips</h3>
      <ul>
        {trips.map((trip, index) => (
          <li key={index}>
            Mode: {trip.mode}, Distance: {trip.distance} km, Duration: {trip.duration} mins, Carbon Footprint: {trip.carbon_footprint} kg CO2e
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
