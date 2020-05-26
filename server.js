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
  res.sendFile(path.join(__dirname, './public/stats.html'));
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
      // console.log(data);
    }
  });
});

//Update exercises to a PREVIOUS workout plan
app.put('/api/workouts/:id', async (req, res) => {
  try {
    const currentWorkout = await db.Workout.findOne({_id:req.params.id});
    // console.log('This is the the currentWorkout',currentWorkout);
    currentWorkout.addExercise(req.body);
    currentWorkout.setTotalDuration();
    // currentWorkout.save();
    const savedWorkout = await currentWorkout.save();
    res.json(savedWorkout);
  }

  catch (err){
    throw err;
  }
});

//Add new exercises to a NEW workout plan.
app.post('/api/workouts', (req, res) => {
  db.Workout.create(req.body, (err, data) => {
    // If statement to catch errors
    // console.log(req.body);
    if (err) {
      res.send(err);
      // Display Data in JSON data format
    } else {
      res.json(data);
      console.log(data);
    }
  });
});
// Get Request to retrieve all workouts
app.get('/api/workouts/range', (req,res)=> {
  db.Workout.find({},(err,data) => {
    if(err) {
      console.log(err);
    } else{
      res.json(data);
    }
  });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});