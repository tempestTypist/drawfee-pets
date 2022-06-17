import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className="footer text-center">
      <div>
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => history.goBack()}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          <Link to="https://www.youtube.com/c/Drawfee">Drawfee Show on Youtube</Link>
        </h4>
      </div>
    </div>
  );
};

export default Footer;
