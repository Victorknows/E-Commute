import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [mode, setMode] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [monthlyTotal, setMonthlyTotal] = useState(0); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = 1; 
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
      calculateMonthlyTotal(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/delete_trip/${id}`);
      fetchLogs(); 
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const calculateMonthlyTotal = (logs) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const monthlyLogs = logs.filter(log => new Date(log.date).getMonth() === currentMonth);
    const total = monthlyLogs.reduce((acc, log) => acc + log.carbon_footprint, 0);
    setMonthlyTotal(total);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Mode" value={mode} onChange={(e) => setMode(e.target.value)} required />
        <input type="text" placeholder="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} required />
        <input type="text" placeholder="Duration (mins)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <button type="submit">Log Trip</button>
      </form>
      <div>
        <h2>Monthly Total Carbon Footprint: {monthlyTotal.toFixed(2)} kg CO2e</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mode</th>
            <th>Distance (km)</th>
            <th>Duration (mins)</th>
            <th>Carbon Footprint (kg CO2e)</th>
            <th>Action</th>
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
              <td>
                <button onClick={() => handleDelete(log.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
