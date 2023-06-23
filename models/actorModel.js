import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
  
  name: {
    type: String,
  
  },
  gender: {
    type: String,

  },
  dob: {
    type: String,
  
  },
  bio: {
    type: String,
    
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movies'
  }]
});

export default mongoose.model("actors", actorSchema);

