import { Button, Card, Grid, Group, NumberInput, Radio, Select, TextInput, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import React, { useState } from 'react'
import Errorboundry from '../../../shared/default/Errorboundry'

function Interviewassesment({ prevStep, nextStep }) {
    const [appearence, setAppearence] = useState(null)
    const updateAppearence = (value) => {
        setAppearence(value)
    }
    const [experienceinsales, setExperirnceinsales] = useState(null)
    const updateExeperienceinsales = (value) => {
        setExperirnceinsales(value)
    }
    const [immigrationexp, setImmigrationexp] = useState(null)
    const updateImmigration = (value) => {
        setImmigrationexp(value)
    }
    const [communicationskills, setCommunicationskills] = useState(null)
    const updateCommunicationskills = (value) => {
        setCommunicationskills(value)
    }
    const [stability, setStability] = useState(null)
    const updateStability = (value) => {
        setStability(value)
    }
    const [languagefluency, setLanguagefluency] = useState(null)
    const updateLanguageFluency = (value) => {
        setLanguagefluency(value)
    }
    const [status, setStatus] = useState(null)
    const updateStatus = (value) => {
        setStatus(value)
    }
    const [reason, setReason] = useState('')
    const updateReason = (e) => {
        setReason(e.currentTarget.value)
    }
    const [recomndSalary, setRecomndSalary] = useState('')
    const updateRecomndSalary = (e) => {
        setRecomndSalary(e.currentTarget.value)
    }
    const [incentives, setIncentives] = useState('')
    const updateIncentives = (e) => {
        setIncentives(e.currentTarget.value)
    }
    const [bonus, setBonus] = useState('')
    const updateBonus = (e) => {
        setBonus(e.currentTarget.value)
    }
    const [expecteddoj, setExpecteddoj] = useState('')
    const updateExpecteddoj = (e) => {
        setExpecteddoj(e.currentTarget.value)
    }
    const [interviewerName, setInterviewerName] = useState('')
    const updateInterviewername = (value) => {
        setInterviewerName(e.currentTarget.value)
    }
    const [designation, setDesignation] = useState('')
    const updateDesignation = (e) => {
        setDesignation(e.currentTarget.value)
    }
    return (
        <>
            <Card withBorder style={{ overflow: "inherit" }}>
                <Grid>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <Select
                            label="Appearance/Presentability"
                            placeholder="select one"
                            withAsterisk
                            data={[
                                { value: 'Excellent', label: 'Excellent' },
                                { value: 'Godd', label: 'Good' },
                                { value: 'Ok', label: 'Ok' },
                                { value: 'Poor', label: 'Poor' },
                            ]}
                            value={appearence}
                            onChange={updateAppearence}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <Select
                            label="Experience in sales"
                            placeholder="select one"
                            withAsterisk
                            data={[
                                { value: 'Excellent', label: 'Excellent' },
                                { value: 'Godd', label: 'Good' },
                                { value: 'Ok', label: 'Ok' },
                                { value: 'Poor', label: 'Poor' },
                            ]}
                            value={experienceinsales}
                            onChange={updateExeperienceinsales}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <Select
                            label="Immigration Experience"
                            placeholder="select one"
                            withAsterisk
                            data={[
                                { value: 'Excellent', label: 'Excellent' },
                                { value: 'Godd', label: 'Good' },
                                { value: 'Ok', label: 'Ok' },
                                { value: 'Poor', label: 'Poor' },
                            ]}
                            value={immigrationexp}
                            onChange={updateImmigration}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <Select
                            label="Communicating skills"
                            placeholder="select one"
                            withAsterisk
                            data={[
                                { value: 'Excellent', label: 'Excellent' },
                                { value: 'Godd', label: 'Good' },
                                { value: 'Ok', label: 'Ok' },
                                { value: 'Poor', label: 'Poor' },
                            ]}
                            value={communicationskills}
                            onChange={updateCommunicationskills}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <Select
                            label="Stability"
                            placeholder="select one"
                            withAsterisk
                            data={[
                                { value: 'Excellent', label: 'Excellent' },
                                { value: 'Godd', label: 'Good' },
                                { value: 'Ok', label: 'Ok' },
                                { value: 'Poor', label: 'Poor' },
                            ]}
                            value={stability}
                            onChange={updateStability}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <Select
                            label="Language Fluency"
                            placeholder="select one"
                            withAsterisk
                            data={[
                                { value: 'Excellent', label: 'Excellent' },
                                { value: 'Godd', label: 'Good' },
                                { value: 'Ok', label: 'Ok' },
                                { value: 'Poor', label: 'Poor' },
                            ]}
                            value={languagefluency}
                            onChange={updateLanguageFluency}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <Radio.Group
                            label="Status"
                            withAsterisk
                            value={status}
                            onChange={updateStatus}
                        >
                            <Group mt="xs">
                                <Radio value="Selected" label="Selected" />
                                <Radio value="Hold" label="Hold" />
                                <Radio value="Rejected" label="Rejected" />
                            </Group>
                        </Radio.Group>
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={8} xl={8}>
                        <Textarea
                            placeholder='enter the reason'
                            label="Reason for Selection/Rejection/Hold"
                            withAsterisk
                            autosize
                            value={reason}
                            onChange={updateReason}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <NumberInput
                            placeholder='enter recommended salary'
                            label="Recommended Salary"
                            withAsterisk
                            hideControls
                            value={recomndSalary}
                            onChange={updateRecomndSalary}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <NumberInput
                            placeholder='incentives'
                            label="Incentives"
                            withAsterisk
                            hideControls
                            value={incentives}
                            onChange={updateIncentives}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <NumberInput
                            placeholder='Bonus'
                            label="Bonus"
                            withAsterisk
                            hideControls
                            value={bonus}
                            onChange={updateBonus}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <DateInput
                            label="Expected date of joining"
                            placeholder="enter the date"
                            maw={400}
                            mx="auto"
                            withAsterisk
                            value={expecteddoj}
                            onChange={updateExpecteddoj}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <TextInput
                            placeholder='enter interviewer name'
                            label="Interviewer name"
                            withAsterisk
                            value={interviewerName}
                            onChange={updateInterviewername}
                        />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                        <TextInput
                            placeholder='enter designation'
                            label="Designation"
                            withAsterisk
                            value={designation}
                            onChange={updateDesignation}
                        />
                    </Grid.Col>
                </Grid>
                <Group position="apart" mt="xl">
                    <Button variant="default" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep}>Next step</Button>
                </Group>
            </Card>
        </>
    )
}

export default Interviewassesment