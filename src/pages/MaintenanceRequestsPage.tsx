import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Select,
    Text,
    VStack,
    useToast,
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {initialRequest} from "../utils/initial-state.util.ts";
import {showErrorToast, showSuccessToast} from "../utils/toast.util.ts";
import PageLayout from "../components/PageLayout.tsx";
import * as React from "react";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {MaintenanceRequest} from "../interfaces/maintenance-request.interfaces.ts";
import {RentalUnit} from "../interfaces/rental-units.interfaces.ts";

const MaintenanceRequestsPage = () => {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([])
    const [form, setForm] = useState(initialRequest)
    const [editId, setEditId] = useState<string | null>(null)
    const [rentalUnits, setRentalUnits] = useState<RentalUnit[]>([])
    const toast = useToast()

    const fetchAll = () => {
        axios.get('http://localhost:8000/api/maintenance-requests').then((res) => setRequests(res.data))
        axios.get('http://localhost:8000/api/rental-units').then((res) => setRentalUnits(res.data))
    }

    useEffect(() => {
        fetchAll()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        const payload = {...form}

        const action = editId
            ? axios.patch(`http://localhost:8000/api/maintenance-requests/${editId}`, payload)
            : axios.post('http://localhost:8000/api/maintenance-requests', payload)

        action
            .then(() => {
                showSuccessToast(toast, editId ? 'Anfrage aktualisiert' : 'Anfrage erstellt')
                setForm(initialRequest)
                setEditId(null)
                fetchAll()
            })
            .catch((err) => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8000/api/maintenance-requests/${id}`).then(() => {
            fetchAll()
            showSuccessToast(toast, 'Anfrage gelöscht')
        })
    }

    const handleEdit = (r: MaintenanceRequest) => {
        setForm({...r})
        setEditId(r.id)
    }

    return (
        <>
            <PageLayout title={'🔧 Maintenance Requests'}>
                <InnerPageLayout>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Mietobjekt</FormLabel>
                            <Select name="mietobjekt" value={form.rental_unit} onChange={handleChange}>
                                {rentalUnits.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.designation}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Beschreibung</FormLabel>
                            <Input name="beschreibung" value={form.description} onChange={handleChange}/>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Status</FormLabel>
                            <Select name="status" value={form.status} onChange={handleChange}>
                                <option value="offen">offen</option>
                                <option value="in Bearbeitung">in Bearbeitung</option>
                                <option value="erledigt">erledigt</option>
                                <option value="dringend">dringend</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Erstellt am</FormLabel>
                            <Input type="date" name="erstellt_am" value={form.created_at} onChange={handleChange}/>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Zugewiesener Handwerker</FormLabel>
                            <Input
                                name="zugewiesener_handwerker"
                                value={form.assigned_craftsman}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <Button colorScheme="blue" onClick={handleSubmit}>
                            {editId ? 'Aktualisieren' : 'Erstellen'}
                        </Button>
                    </VStack>
                </InnerPageLayout>

                <Heading size="md" mb={4}>
                    📋 Anfragen
                </Heading>
                <VStack spacing={4}>
                    {requests.map((r) => (
                        <Box key={r.id} p={5} borderWidth="1px" borderRadius="lg" shadow="sm" w="100%" bg="gray.50">
                            <Text>
                                🏠 {r.rental_unit}
                            </Text>
                            <Text>📅 {r.created_at}</Text>
                            <Text>{r.description}</Text>
                            <Text>Status: {r.status}</Text>
                            <Text>🔧 {r.assigned_craftsman}</Text>
                            <HStack mt={3}>
                                <Button size="sm" colorScheme="teal" onClick={() => handleEdit(r)}>
                                    Bearbeiten
                                </Button>
                                <Button size="sm" colorScheme="red" onClick={() => handleDelete(r.id)}>
                                    Löschen
                                </Button>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            </PageLayout>
        </>
    )
}

export default MaintenanceRequestsPage
