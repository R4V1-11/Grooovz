import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Grooovz_player from './components/Grooovz_player';
import HeroSection from './components/HeroSection';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' exact element={<HeroSection/>} />
      <Route path='/login' exact element={<LoginForm/>}/>
      <Route path='/sign-up' exact element={<SignUpForm/>}/>
      <Route path='/grooovz' exact element={<Grooovz_player/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
