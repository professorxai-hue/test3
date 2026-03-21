import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized =  => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>403 - Unauthorized</h2>
    <p>You do not have permission to access this page.</p>
    <Link to="/dashboard">Go to Dashboard</Link>
  </div>
);

export default Unauthorized;
