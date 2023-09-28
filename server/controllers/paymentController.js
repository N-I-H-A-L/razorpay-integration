import { instance } from "../server.js";
import crypto from 'crypto';
import { Payment } from '../models/paymentModel.js';

export const checkout = async (req, res) =>{
    //The code for creating an order and 'options' are given in the razorpay's website.
    const options = {
        amount: Number(req.body.amount * 100), //amount should be in the smallest currency that is in case of INR it's paise. 50000 = 500 rs. So multiply by 100 to convert it into paise.
        currency: "INR",
    };

    //Create a new order with 'instance' as the razorpay instance and with the specifications as 'option'. 
    const order = await instance.orders.create(options);
    res.status(200).json({
        success: true,
        order
    });

    // console.log(order);
    // {
    //     id: 'order_MhO8KiK2ABFwyy',
    //     entity: 'order',
    //     amount: 50000,
    //     amount_paid: 0,
    //     amount_due: 50000,
    //     currency: 'INR',
    //     receipt: null,
    //     offer_id: null,
    //     status: 'created',
    //     attempts: 0,
    //     notes: [],
    //     created_at: 1695823920
    // }

    //So the order for the payment is created, now we will have to verify whether the order is correct or not then proceed with the payment.
}

export const paymentVerification = async (req, res) =>{
    // console.log(req.body);
    // The callback_url of razorpay will send these information to the post request:
    // {
    //     razorpay_payment_id: 'pay_MhaxksjpRmUKrz',
    //     razorpay_order_id: 'order_MhaxHjUSkQUlnf',
    //     razorpay_signature: 'c5a4b9025ff18d431eac2ec2f5f7fd0890728c53a616b558e3e5580975aa81f9'
    // }

    //Checking the SHA256 code of the payment, whether it matches or not to verify the payment.
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                    .update(body.toString())
                                    .digest('hex');

    //If signature sent by the post request is same as expected signature implies, the payment is legit.
    if(razorpay_signature==expectedSignature){
        //Store the transaction details in the database.
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        });


        //If the payment is legit, redirect to this URL.
        res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
        //Sent the payment id as query.
    }
    else{
        res.status(400).json({
            success: false
        });
    }
};