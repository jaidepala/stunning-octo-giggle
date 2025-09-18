import React from 'react';
import logo from './logo.svg';
import './App.css';

// Components
import Location from './components/location';
import HourlyForecast from './components/hourly-forecast';
import EightDayForecast from './components/8-day-forecast';

function App() {
  return (
    <div className="App">
      <Location />
      {/* <HourlyForecast />
      <EightDayForecast /> */}
    </div>
  );
}

export default App;
