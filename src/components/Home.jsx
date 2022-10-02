import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: '60px',
  },
};

function Home() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>{data?.name}</h1>
        <div style={{ flexDirection: 'row' }}>
          <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>
        <Social />
        <Button
          key={data.resume}
          style={styles.iconStyle}
          variant={theme.bsSecondaryVariant}
          onClick={() => window.open(data.resume, '_blank')}
        >
          <img alt="download logo" src="images/download.png" width="28px" />
          &nbsp;
          Resume
        </Button>
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
