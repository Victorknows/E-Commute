import React, { useState } from 'react';
import axios from 'axios';

const TripForm = ({ addTrip }) => {
  const [mode, setMode] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/log_trip', { mode, distance, duration, user_id: 1 });  // Update user_id dynamically
      addTrip(response.data);
      setMode('');
      setDistance('');
      setDuration('');
    } catch (error) {
      console.error('There was an error logging the trip!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Mode of transport" value={mode} onChange={(e) => setMode(e.target.value)} required />
      <input type="number" placeholder="Distance" value={distance} onChange={(e) => setDistance(e.target.value)} required />
      <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      <button type="submit">Log Trip</button>
    </form>
  );
};

export default TripForm;
