//All the routes related to Payments will be handled here.
import express from "express";
import { checkout, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

//When a post request is made on the URL, /api/checkout, the checkout function will be executed. 
router.route('/checkout')
    .post(checkout);

//The callback of razorpay accepts a post request. 
router.route('/paymentverification')
    .post(paymentVerification);
export default router;