import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import Network from './pages/Network';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/Login" exact element={<Login/>}></Route>
        <Route path="/SignIn" exact element={<SignIn/>}></Route>
        <Route path='/Network' exact element={<Network/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;