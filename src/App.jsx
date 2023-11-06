import React from 'react'
import Interviewform from './Interviewform';
import { Center, Container, Group, Image, Text } from '@mantine/core';
import opulentus from '././assets/opulentus.jpg'
function App() {
  return (
    <Container >
      <Group position='apart' py={20}>
        <Text size={20} color='#00a85a' weight={700}>Opulentus:-</Text>
        {/* <Text weight={600} size={16} color='#00a85a' style={{ fontFamily: "sans-serif" }}>Interview Assesment Form</Text> */}
        <Image radius="md" width={30} src={opulentus} alt=" image" />
      </Group>
      <Interviewform />
    </Container >
  )
}

export default App