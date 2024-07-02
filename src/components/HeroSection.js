import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import videobg from '../assets/bg_video.mp4'
import Navbar from './Navbar';

function HeroSection() {
  return (
    <div>
    <Navbar />
    <div className='hero-container' >
      <video src={videobg} autoPlay loop muted id = "myVideo"/>
      <h1>MUSIC AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btn'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        
      </div>
    </div>
    </div>
  );
}

export default HeroSection;
