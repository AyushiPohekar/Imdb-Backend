import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  genres: {
    type: [String],
  
  },
  original_language: {
    type: String,

  },
  original_title: {
    type: String,
  
  },
  overview: {
    type: String,
  
  },
  poster_path: {
    type: String,
   
  },
  releaseDate: {
    type: String,
  
  },
  status: {
    type: String,
  
  },
  vote_average: {
    type: Number,
   
  },
 
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'producers',
   
  },
  actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'actors'
  }]
});

export default mongoose.model("movies", movieSchema);


