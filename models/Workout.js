const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  excercises:[
    {
      type: {
        type: String,
        trim: true,
        required: 'Excercise type is Required',
      },
      name: {
        type: String,
        trim: true,
        required: 'Exercise Name is Required',
      },
      duration: {
        type: Number,
        trim: true,
      },
      weight: {
        type: Number,
        trim: true,
      },
      reps: {
        type: Number,
        trim: true,
      },
      sets: {
        type: Number,
        trim: true,
      },
      distance: {
        type: Number,
        trim: true,
      },
    },
  ],
});

// WorkoutSchema.methods.totalDuration = function () {
//   let total = 0;
//   exercises.forEach (excercise => {
//     totalDuration += excercise.duration;
//   });
//   this.totalDuration = total;
//   return this.totalDuration;
// };

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;
