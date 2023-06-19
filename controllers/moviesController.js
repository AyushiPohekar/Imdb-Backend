//get All movies

import movieModel from "../models/movieModel.js";

export const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel
      .find({})
      .populate("actors")
      .populate("producer");

    res.status(200).send({
      success: true,
      counTotal: movies.length,
      message: "AllMovies ",
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting movies",
      error: error.message,
    });
  }
};

// get single movie
export const getAllMoviesById = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log(id)

    const movie = await movieModel
      .findOne({ _id: id })
      .populate("actors")
      .populate("producer");
    res.status(200).send({
      success: true,
      message: "Single Movie Fetched",
      movie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getitng single movie",
      error,
    });
  }
};

// export const createMovies = async (req, res) => {
//   try {
//     const {  original_title, genres, id, original_language,  popularity,poster_path , releaseDate,overview,vote_average,vote_count,status,spoken_languages, producer,actors } =
//       req.body;

//    const movie= new ProductModel({ ...req.body, slug: slugify(name) });
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Created Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in creating product",
//     });
//   }
// };
