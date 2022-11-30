import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div style={{ flex: '1 1 0' }}>
      <div>Welcome</div>
      <button>
        <Link to={'/login'}>LogIn</Link>
      </button>
      <button>
        <Link to={'/registration'}>Registration</Link>
      </button>
    </div>
  );
}

export default Welcome;
