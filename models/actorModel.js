import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
  // id:{
  //  type:Number,
  //  required:true
  // },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: String,
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

export default mongoose.model("actors", actorSchema);

