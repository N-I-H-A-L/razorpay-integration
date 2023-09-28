import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import Card from './Card';
import axios from 'axios';

const Home = () => {
  const checkoutHandler = async (amount) => {

    //Get the key of razorpay instance by making a GET request. 
    //data key of object returned by axios.get will contain the data sent by the server as response.
    const { data: {key} }  = await axios.get("http://localhost:4000/api/getkey");

    //'data' key of object returned by axios.post will contain the data sent by the server as response.
    const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
      //Destructured the 'data' object further to get the 'order' object of 'data'. 
      amount
    });

    //Code given in Razorpay Docs
    const options = {
      key, 
      amount: order.amount, //amount received from the data of post request
      currency: "INR",
      name: "Nihal",
      description: "Test Transaction",
      image: "https://res.cloudinary.com/demo/image/facebook/65646572251.jpg",
      order_id: order.id, //id received from the data of post request
      callback_url: "http://localhost:4000/api/paymentverification", //We want the callback_url to be called to the API we created in the backend. 
      // And then razorpay will send data about the payment in the body of the POST request made to callback_url.
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#121212"
      }
    };

    //In index.html, we've added a script for razorpay that's why we're able to use window.Razorpay.
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <Box>
      {/* An array can be passed to Stack direction, if it's a phone display the content as 'column' else 'row'. */}
      <Stack h={"100vh"} justifyContent={"center"} alignItems={"center"} direction={['column', 'row']}>
        {/* Cards will be displayed on different columns if it's phone (480px width) else row.  */}
        <Card amount={5000} img={"https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"} checkoutHandler={checkoutHandler} />
        <Card amount={3000} img={"http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"} checkoutHandler={checkoutHandler} />
      </Stack>
    </Box>
  )
}
export default Home;
