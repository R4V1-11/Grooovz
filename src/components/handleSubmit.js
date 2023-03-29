import axios from 'axios'

function handleSubmit(event) {
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

    if(password.value !== password2.value) {
      alert('Both the passwords should match');
      return;
    }
    
    axios.post('http://localhost:5000/api/users', {
      username: username.value.trim(),
      password: password.value,
      email: email.value
    })
    .then(function (response) {
      console.log(response);
      if (response.status === 201) {
        alert('User created successfully');
      } else if (response.status === 409) {
        alert('Username already exists');
      }
      // Do something with the response if needed
    })
    .catch(function (error) {
      console.log(error);
      // Handle errors if any
    });
    // Submit the form if validation passes
    form.submit();
}

export default handleSubmit;

