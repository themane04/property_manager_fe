import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text,
    VStack,
    useToast,
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Feature} from "../interfaces/interfaces.ts";
import {initialFeature} from "../utils/initial-state.util.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toast.util.ts";
import PageLayout from "../components/PageLayout.tsx";
import * as React from "react";

const FeaturesPage = () => {
    const [features, setFeatures] = useState<Feature[]>([])
    const [form, setForm] = useState(initialFeature)
    const [editId, setEditId] = useState<string | null>(null)
    const toast = useToast()

    const fetchFeatures = () => {
        axios.get('http://localhost:8000/api/features').then((res) => {
            setFeatures(res.data)
        })
    }

    useEffect(() => {
        fetchFeatures()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        const action = editId
            ? axios.patch(`http://localhost:8000/api/features/${editId}`, form)
            : axios.post('http://localhost:8000/api/features', form)

        action
            .then(() => {
                showSuccessToast(toast, editId ? 'Feature aktualisiert' : 'Feature erstellt')
                setForm(initialFeature)
                setEditId(null)
                fetchFeatures()
            })
            .catch((err) => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8000/api/features/${id}`).then(() => {
            fetchFeatures()
            showInfoToast(toast, 'Feature gelöscht')
        })
    }

    const handleEdit = (feature: Feature) => {
        setForm({name: feature.name})
        setEditId(feature.id)
    }

    return (
        <>
            <PageLayout title="⚙️ Feature-Verwaltung">
                <Box bg="white" p={6} shadow="md" borderRadius="md" mb={12}>
                    <Heading size="md" mb={4}>
                        {editId ? 'Feature bearbeiten' : 'Neues Feature'}
                    </Heading>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input name="name" value={form.name} onChange={handleChange}/>
                        </FormControl>
                        <Button colorScheme="blue" onClick={handleSubmit}>
                            {editId ? 'Aktualisieren' : 'Erstellen'}
                        </Button>
                    </VStack>
                </Box>

                <Heading size="md" mb={4}>
                    📋 Bestehende Features
                </Heading>
                <VStack spacing={4} align="stretch">
                    {features.map((f) => (
                        <Box key={f.id} p={4} borderWidth="1px" borderRadius="lg" shadow="sm" bg="gray.50">
                            <Text fontWeight="semibold">{f.name}</Text>
                            <HStack mt={2}>
                                <Button size="sm" colorScheme="teal" onClick={() => handleEdit(f)}>
                                    Bearbeiten
                                </Button>
                                <Button size="sm" colorScheme="red" onClick={() => handleDelete(f.id)}>
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

export default FeaturesPage
