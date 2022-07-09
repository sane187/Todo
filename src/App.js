import React from 'react';
import './App.css';
import Calender from './Components/Calender';
import Header from './Components/Header';
import Task from './Components/Task';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Calender />
      <Task />
    </React.Fragment>
  );
}

export default App;
