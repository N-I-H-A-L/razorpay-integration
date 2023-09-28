import express, { urlencoded } from "express";
import { config } from "dotenv";
import paymentRouter from './routes/paymentRoutes.js';
import cors from 'cors';

//'path' will contain the relative path of the config.env file. 
config({ path: "./config/config.env" });

export const app = express();

//Middlewares
app.use(cors());
//to access json data
app.use(express.json());
app.use(urlencoded({extended: true}));

//"/api" will be added as prefix to all the endpoints of paymentRouter.
app.use("/api", paymentRouter);

//To send the razorpay instance's key to the frontend.
app.get("/api/getkey", (req, res)=>{
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY,
    });
});