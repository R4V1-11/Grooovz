const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/grooovz_users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB database');
})
.catch((error) => {
  console.error('Error connecting to MongoDB database:', error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// define a schema for your user collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

// create a model for your user collection
const User = mongoose.model('User', userSchema);

app.post('/api/users', (req, res) => {
  console.log(req.body); // check if the server is receiving data from the client-side code
  const { username, password, email } = req.body;
  
  // Check if the username already exists
  User.findOne({ username }, (err, existingUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    } else {
      console.log('existingUser:', existingUser);
      if (existingUser) {
        res.status(409).send('Username already exists');
      } else {
        const user = new User({ username, password, email });
        user.save()
        .then(savedUser => {
          console.log(savedUser);
          res.status(201).send('User created successfully');
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Error creating user');
        });
      }
    }
  });
});



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => { res.send('Hello World!') })
