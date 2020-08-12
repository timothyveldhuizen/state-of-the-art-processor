import React from 'react';
import logo from './logo.svg';
import './App.css';
import { helloWorld } from 'form-submission-processor';
import FileUpload from './components/FileUpload';

function App() {
  const hi = helloWorld();

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{hi}</h1>
      </header>
      <FileUpload />
    </>
  );
}

export default App;
