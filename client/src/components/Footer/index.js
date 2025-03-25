import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="footer text-center">
      {/* {location.pathname !== '/' && (
        <button
          className="btn btn-dark mb-3"
          onClick={() => history.goBack()}
        >
          &larr; Go Back
        </button>
      )} */}
    </div>
  )
}

export default Footer;
