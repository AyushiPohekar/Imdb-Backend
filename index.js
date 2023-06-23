import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./route/authRoutes.js";
import movieRoutes from "./route/movieRoute.js"
import axios from "axios";
import actorRoutes from "./route/actorRoute.js"
import producerRoutes from "./route/producerRoute.js"

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();



//mioddlewares
const port = process.env.PORT;
app.use(cors());
app.use(express.json())


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/actors", actorRoutes);
app.use("/api/v1/producers", producerRoutes);

//rest api
app.get('/',(req,res)=>{
  res.send("<h1>Welcome to Movie app</h1>")
})





app.listen(port, () => {
  console.log(`app is listening to ${port}`);
});
