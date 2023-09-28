import { app } from './app.js';
import Razorpay from "razorpay";
import { connectDB } from './config/database.js';

//Note: We can use the environment variables created inside config.env since, we've imported 'app' from app.js and dotenv was configured in that file.

//Connecting to Database
connectDB();

//Creating the razorpay instance and exporting it. 
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

app.get('/', (req, res)=>{
    res.send("Server is working");
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on port, ${process.env.PORT}`);
});