import express from "express";
import { getAllMovies, getAllMoviesById } from "../controllers/moviesController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

router.get("/",getAllMovies)
router.get("/:id",getAllMoviesById)
//router.post("/",requireSignIn,createMovies)
 export default router;
