import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./route/authRoutes.js";

import axios from "axios";



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

//rest api
app.get('/',(req,res)=>{
  res.send("<h1>Welcome to ecommerce app</h1>")
})





app.listen(port, () => {
  console.log(`app is listening to ${port}`);
});
