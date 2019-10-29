import React from 'react';

import './App.css';

const App = ({ children }) => {
  return ( 
    <div className="App">
      <div className="title-app">todo list</div>
      {children}
    </div>
  );
}

export default App;
