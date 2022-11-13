import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="footer text-center">
      {location.pathname !== '/' && (
        <button
          className="btn btn-dark mb-3"
          onClick={() => history.goBack()}
        >
          &larr; Go Back
        </button>
      )}
      <p>Drawfee is a comedy drawing YouTube show where artists (primarily Nathan Yaffe, Jacob Andrews, Julia Lepetit, and Karina Farek) turn audience suggestions into silly drawings.</p>
      <p>Drawfee Pets is a lovingly made fan-project to give a home to these wayward drawings.</p>
      <a href="https://www.youtube.com/c/Drawfee" target="_blank" rel="noopener noreferrer">Drawfee Show on Youtube</a>
      <a href="https://www.patreon.com/drawfee" target="_blank" rel="noopener noreferrer">Drawfee's Patreon</a>
    </div>
  );
};

export default Footer;
