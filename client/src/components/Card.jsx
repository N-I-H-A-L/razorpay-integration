import React from 'react';
import { VStack, Image, Text, Button } from '@chakra-ui/react';

const Card = ({ amount, img, checkoutHandler}) => {
  return (
    <VStack>
      <Image src={img} boxSize={"64"} objectFit={"cover"}/>
      <Text>₹{amount}</Text>
      <Button onClick={()=>checkoutHandler(amount)}>Buy Now</Button>
    </VStack>
  )
}

export default Card;
