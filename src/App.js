import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import MainCardView from './components/MainCardView';

function App() {

  const [screensize, setScreensize] = useState(window.innerWidth);
  window.onresize = () => setScreensize(window.innerWidth);

  const DeviceVersion = () => {
    if (screensize <= 1336) {
        return "98%"; // For Mobile
    }
    else {
        return "50%"; // For Desktop/Bigger Screen
    }
  }
  
  return (
    <>
    <Header Width={DeviceVersion()} />
    <MainCardView Width={DeviceVersion()} />
    </>
  );
}

export default App;
