import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Grooovz from './components/pages/Grooovz';
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      <Route path='/' exact element={<Home/>} />
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/sign-up' exact element={<SignUp/>}/>
      <Route path='/grooovz' exact element={<Grooovz/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
