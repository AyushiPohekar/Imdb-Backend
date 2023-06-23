import express from "express";
import updateMovieController, { createMovies, deleteMovieController, getAllMovies, getAllMoviesById } from "../controllers/moviesController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

router.get("/",getAllMovies);
router.get("/:movieId",getAllMoviesById);
router.post("/",requireSignIn,createMovies);
router.delete("/:movieId",requireSignIn,deleteMovieController )
router.put("/:movieId",requireSignIn,updateMovieController)


 export default router;
