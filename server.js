const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require ('path');
const PORT = process.env.PORT || 3000;

const db = require('./models');

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
});

//Retrieves the index.html
app.get('/', (req,res) =>{
  res.send(index.html);
});
//Retrieves the exercise.html
app.get('/exercise',(req,res) => {
  res.sendFile(path.join(__dirname, './public/exercise.html'));
});
//Retrieves the stats.html
app.get('/stats', (req,res)=> {
  res.sendFile(path.join(__dirname, '...public/stats.html'));
});
//Retrieves the api/workouts
app.get('/api/workouts', (req, res) => {
  db.Workout.find({}, (err, data) => {
    // If statement to catch errors
    if (err) {
      res.send(err);
      // Display Data in JSON data format
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

//Add exercises to a PREVIOUS workout plan 
app.put('/api/workouts/:id', (req, res) => {
  db.Workout.update(
    { _id: req.params.id },
    {
      $push: { exercises: req.body },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
});

//Add new exercises to a NEW workout plan.

app.post('/api/workouts', (req, res) => {
  db.Workout.create(req.body, (err, data) => {
    // If statement to catch errors
    console.log(req.body);
    if (err) {
      res.send(err);
      // Display Data in JSON data format
    } else {
      res.json(data);
      console.log(data);
    }
  });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});