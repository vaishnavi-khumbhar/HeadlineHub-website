import React from 'react';
import loading from './loading.gif'; // Make sure loading.gif is in this folder

const Spinner = () => (
  <div className="text-center my-3">
    <img className="my-3" src={loading} alt="Loading..." style={{ width: '50px', height: '50px' }}/>
  </div>
);

export default Spinner;
