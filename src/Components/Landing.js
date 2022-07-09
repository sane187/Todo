import React from 'react';
import Calender from './Calender';
import Header from './Header';
import Task from './Task';

const Landing = () => {
  return (
    <React.Fragment>
          <Header />
      <Calender />
      <Task />
    </React.Fragment>
  )
}

export default Landing