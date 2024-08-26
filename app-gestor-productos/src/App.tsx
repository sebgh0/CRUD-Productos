import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Inicio } from './components/Inicio';
import { Products } from './components/Products';
import { Categories } from './components/Categories';



function App() {
  return (

    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Inicio />}/>
        <Route path='/product' element={<Products />}/>
        <Route path='/category' element={<Categories />}/>

      </Routes>
    </Router>
    
  );
}

export default App;
