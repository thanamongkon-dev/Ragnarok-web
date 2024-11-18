// src/hooks/useServerStatus.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useServerStatus = () => {
  const [serverStatus, setServerStatus] = useState({
    map: '',
    players: '',
    account: '',
  });

  const getServerStatus = async () => {
    try {
      const response = await axios.get('http://localhost/api/server_status.php');
      setServerStatus(response.data);
    } catch (error) {
      console.error('Error fetching server status:', error);
    }
  };

  useEffect(() => {
    // Fetch server status on component mount
    getServerStatus();

    // Set up interval to check server status every 1 minute
    const interval = setInterval(getServerStatus, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return serverStatus;
};

export default useServerStatus;
