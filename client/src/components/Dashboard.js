import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [mode, setMode] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const user_id = localStorage.getItem('user_id');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the data being sent
    console.log({
      user_id,
      mode,
      distance,
      duration
    });

    try {
      await axios.post('/log_trip', { user_id, mode, distance, duration });
      fetchLogs();
      setMode('');
      setDistance('');
      setDuration('');
    } catch (error) {
      console.error('Error logging trip:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await axios.get('/api/trips');
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Mode" value={mode} onChange={(e) => setMode(e.target.value)} required />
        <input type="text" placeholder="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} required />
        <input type="text" placeholder="Duration (mins)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <button type="submit">Log Trip</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mode</th>
            <th>Distance (km)</th>
            <th>Duration (mins)</th>
            <th>Carbon Footprint (kg CO2e)</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.date}</td>
              <td>{log.mode}</td>
              <td>{log.distance}</td>
              <td>{log.duration}</td>
              <td>{log.carbon_footprint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
