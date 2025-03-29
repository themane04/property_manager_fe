import {
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {initialProperty} from "../utils/initial-state.util.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toast.util.ts";
import PageLayout from "../components/PageLayout.tsx";
import * as React from "react";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {Property} from "../interfaces/properties.interfaces.ts";
import ItemList from "../components/UpdateDeleteButtons.tsx";

const PropertiesPage = () => {
    const [properties, setProperties] = useState<Property[]>([])
    const [form, setForm] = useState(initialProperty)
    const [editId, setEditId] = useState<string | null>(null)
    const toast = useToast()

    const fetchProperties = () => {
        axios.get('http://localhost:8000/api/properties').then((res) => {
            setProperties(res.data)
        })
    }

    useEffect(() => {
        fetchProperties()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        const payload = {
            ...form,
            year_of_construction: Number(form.year_of_construction),
            flats_amount: Number(form.flats_amount),
            park_spaces_amount: Number(form.park_spaces_amount),
        }

        const action = editId
            ? axios.patch(`http://localhost:8000/api/properties/${editId}`, payload)
            : axios.post('http://localhost:8000/api/properties', payload)

        action
            .then(() => {
                showSuccessToast(toast, editId ? 'Liegenschaft aktualisiert' : 'Liegenschaft erstellt')
                setForm(initialProperty)
                setEditId(null)
                fetchProperties()
            })
            .catch((err) => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8000/api/properties/${id}`).then(() => {
            fetchProperties()
            showInfoToast(toast, 'Liegenschaft gelöscht')
        })
    }

    const handleEdit = (p: Property) => {
        setForm({...p})
        setEditId(p.id)
    }

    return (
        <>
            <PageLayout title={'🏢 Properties'}>
                <InnerPageLayout>
                    {Object.entries(form).map(([key, value]) => (
                        <FormControl key={key} isRequired>
                            <FormLabel textTransform="capitalize">{key.replace('_', ' ')}</FormLabel>
                            <Input name={key} value={value} onChange={handleChange}/>
                        </FormControl>
                    ))}
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        {editId ? 'Update' : 'Create'}
                    </Button>
                </InnerPageLayout>

                <ItemList
                    title={"📋 List of Properties"}
                    data={properties}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default PropertiesPage
