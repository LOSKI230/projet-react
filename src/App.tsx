import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./router";
import Navbar from './composants/organisms/Navbar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
