import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './SignUpForm.css';
import videobf from '../assets/signupbg2.mp4'


function SignUpForm() {
  const navigate = useNavigate();
  const [signinError, setSigninError] = useState('');
  
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.elements.username;
    const password = form.elements.password;
    const email = form.elements.email;
    const password2 = form.elements.password2;
  
    if (username.value.trim() === '') {
      alert('Please enter a username.');
      return;
    }
  
    if (password.value.length < 8 || password.value.length > 20) {
      alert('Password must be between 8 and 20 characters.');
      return;
    }
  
    if (password.value !== password2.value) {
      alert('Both the passwords should match');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.67.26:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value.trim(),
          password: password.value,
          email: email.value,
        })
      });
  
      if (response.status === 201) {
        //alert('User created successfully');
        navigate('/grooovz');
      } else if (response.status === 409) {
        //alert('Username already exists');
        const data = await response.json();
        setSigninError(data.message);
        return;
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create user');
    }
  }
  
  
  

  return (
    <div className="signupform">
       <video src={videobf} autoPlay loop muted id = "myVideo"/>
      <h1>FILL IT UP TO START YOUR JOURNEY</h1>
      <form onSubmit={handleSubmit}>
  <label htmlFor="email" style={{color: 'white'}}>
    Email
  </label>
  <input
    type="email"
    name="email"
    className="form-control"
    placeholder="Enter your Email"
    required
  />
  <label htmlFor="username" style={{color: 'white'}}>
    Username
  </label>
  <input
    type="text"
    name="username"
    className="form-control"
    placeholder="Enter username"
    required
  />
  <label htmlFor="password">Password</label>
  <input
    type="password"
    name="password"
    className="form-control"
    placeholder="Password"
    required
  />
  <label htmlFor="password">Re-type Password</label>
  <input
    type="password"
    name="password2"
    className="form-control"
    placeholder="Re-type Old Password"
    required
  />
  <button type="submit" className="btn btn-primary text-left">
    Submit
  </button>
  <p>
    {' '}
    <Link to="/login" className="transition-link">
      existing user?
    </Link>{' '}
  </p>
  {signinError && <p className="error-message">{signinError}</p>}
  
</form>


  </div>

  )
}

export default SignUpForm;
/* axios
      .post('http://localhost:5000/api/users', {
        username: username.value.trim(),
        password: password.value,
        email: email.value,
      })
      .then(function (response) {
        console.log(response);
        // Check if the user exists
        return axios.post('http://localhost:5000/api/users/checkUser', {
          username: username.value.trim(),
        });
      })
      .then(function (response) {
        console.log(response);
        if (response.data === 'User found successfully') {
          alert('User already exists');
        } else {
          alert('User created successfully');
          navigate('/grooovz');
        }

        // Do something with the response if needed
      })
      .catch(function (error) {
        console.log(error);
      }); */