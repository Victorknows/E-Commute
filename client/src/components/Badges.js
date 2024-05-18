import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Badges = () => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const response = await axios.get('/api/badges');
      setBadges(response.data);
    } catch (error) {
      console.error('Error fetching badges:', error);
    }
  };

  return (
    <div>
      <h2>Badges</h2>
      <ul>
        {badges.map(badge => (
          <li key={badge.id}>{badge.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Badges;
