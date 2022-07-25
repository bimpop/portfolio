import React, { useState, useEffect } from 'react';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../App.css';

function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.footer, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      {data
        ? (
          <footer className="bg-dark text-light fixed-bottom p-2">
            {data.footer}
          </footer>
        )
        : <FallbackSpinner /> }
    </>
  );
}

export default Footer;
