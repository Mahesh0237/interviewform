import { Alert, Stack, Text } from '@mantine/core'
import React from 'react'

function Steppercompleted() {

    return (
        <Alert color="teal" p={50} >
            <Stack>
                <Text color='red' size={25} weight={600} align='center' fs="italic">Thank You !</Text>
                <Text size={19} ta="center">Your submission has been completed..!</Text>
            </Stack>
        </Alert>
    )
}

export default Steppercompleted