import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  original_title: {
    type: String,
    required: true
  },
   genres:{
    type:String
   },
   id:{
    type:Number
   },
     original_language:{
      type:String
     },
      popularity:{
        type:Number
      },
      poster_path:{
        type:String
      },

  releaseDate: {
    type: String,
   
  },
  overview:{
    type: String,

  },
  vote_average:{
    type: Number,
   
  },
  vote_count:{
    type:Number
  },
  status:{
    type:String
  },
  spoken_languages:[
    {type:String},{type:String}
  ],
 
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producer',
    required: true
  },
  actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor'
  }]
});

export default mongoose.model("movies", movieSchema);


