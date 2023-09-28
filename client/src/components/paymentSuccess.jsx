import React from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    //To get the reference id of the payment from URL
    const search = useLocation().search;
    const searchParams = new URLSearchParams(search);
    const reference_id = searchParams.get('reference');

  return (
    <Box>
        <VStack h={"100vh"} justifyContent={"center"}>
            <Heading textTransform={"uppercase"}> Order Successful</Heading>
            <Text>
                Reference No.: {reference_id}
            </Text>
        </VStack>
    </Box>
  )
}

export default PaymentSuccess
