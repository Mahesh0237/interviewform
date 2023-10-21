import React from 'react'
import Interviewform from './Interviewform';
import { Center, Container, Text } from '@mantine/core';

function App() {
  return (
    <Container >
      <Center mb={20}>
        <Text></Text>
        <Text weight={600} size={25} color='#00a85a' td="underline">Interview Assesment Form</Text>
      </Center>
      <Interviewform />
    </Container >
  )
}

export default App