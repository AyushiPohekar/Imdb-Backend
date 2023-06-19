import mongoose from "mongoose";

const producerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movies'
  }]
});

export default mongoose.model("producers", producerSchema);

