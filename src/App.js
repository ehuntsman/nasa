import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Outlet, Link
} from "react-router-dom";

import Home from './components/Home';
import Rover from './components/Rover';
import Navi from './components/Navi';



const App = () => {
  return (
    <div>
      <Navi />
      <Outlet />
    </div>
  );
}

export default App;
