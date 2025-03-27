import {
    Box,
    Button,
    Input,
    VStack,
    Heading,
    Text,
    HStack,
    useToast, FormControl, FormLabel
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Tenant} from "../interfaces/interfaces.ts";
import * as React from "react";
import {initialTenant} from "../utils/initial-state.util.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toast.util.ts";
import PageLayout from "../components/PageLayout.tsx";

function TenantsPage() {
    const [tenants, setTenants] = useState<Tenant[]>([])
    const [form, setForm] = useState(initialTenant)
    const [editId, setEditId] = useState<string | null>(null)
    const toast = useToast()

    const fetchTenants = () => {
        axios.get('http://localhost:8000/api/tenants').then(res => {
            setTenants(res.data)
        })
    }

    useEffect(() => {
        fetchTenants()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        const action = editId
            ? axios.patch(`http://localhost:8000/api/tenants/${editId}`, form)
            : axios.post('http://localhost:8000/api/tenants', form)

        action
            .then(() => {
                showSuccessToast(toast, editId ? 'Mieter aktualisiert' : 'Mieter erstellt')
                setForm(initialTenant)
                setEditId(null)
                fetchTenants()
            })
            .catch(err => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8000/api/tenants/${id}`).then(() => {
            fetchTenants()
            showInfoToast(toast, 'Mieter gelöscht')
        })
    }

    const handleEdit = (tenant: Tenant) => {
        setForm({...tenant})
        setEditId(tenant.id)
    }

    return (
        <>
            <>
                <PageLayout title={'👤 Tenants'}>
                    <Box
                        bg="white"
                        borderRadius="xl"
                        shadow="xl"
                        p={8}
                        mb={12}
                        border="1px solid"
                        borderColor="gray.100"
                    >
                        <Heading size="md" mb={6} color="blue.600">
                            {editId ? 'Mieter bearbeiten' : 'Neuen Mieter erstellen'}
                        </Heading>
                        <VStack spacing={4}>
                            {Object.entries(form).map(([key, value]) => (
                                <FormControl key={key} isRequired>
                                    <FormLabel textTransform="capitalize">{key}</FormLabel>
                                    <Input
                                        name={key}
                                        value={value}
                                        onChange={handleChange}
                                        bg="gray.50"
                                    />
                                </FormControl>
                            ))}
                            <Button colorScheme="blue" size="lg" alignSelf="flex-start" onClick={handleSubmit}>
                                {editId ? 'Aktualisieren' : 'Erstellen'}
                            </Button>
                        </VStack>
                    </Box>

                    <Heading size="md" mb={4} color="gray.700">
                        📋 Bestehende Mieter
                    </Heading>
                    <VStack align="stretch" spacing={4}>
                        {tenants.map(t => (
                            <Box
                                key={t.id}
                                p={5}
                                borderWidth="1px"
                                borderRadius="lg"
                                shadow="sm"
                                bg="gray.50"
                                _hover={{shadow: 'md'}}
                            >
                                <Text fontWeight="bold" fontSize="lg" color="gray.800">
                                    {t.first_name} {t.last_name}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    📧 {t.email}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    📍 {t.street} {t.house_number}, {t.postal_code} {t.city}
                                </Text>
                                <HStack mt={3}>
                                    <Button size="sm" colorScheme="teal" onClick={() => handleEdit(t)}>
                                        Bearbeiten
                                    </Button>
                                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(t.id)}>
                                        Löschen
                                    </Button>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>
                </PageLayout>
            </>
        </>
    )
}

export default TenantsPage;