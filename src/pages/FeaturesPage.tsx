import {
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {initialFeature} from "../utils/initial-state.util.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toast.util.ts";
import PageLayout from "../components/PageLayout.tsx";
import * as React from "react";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {Feature} from "../interfaces/features.interfaces.ts";
import ItemList from "../components/UpdateDeleteButtons.tsx";

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
            <PageLayout title="⚙️ Features">
                <InnerPageLayout>
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" value={form.name} onChange={handleChange}/>
                    </FormControl>
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        {editId ? 'Aktualisieren' : 'Erstellen'}
                    </Button>
                </InnerPageLayout>

                <ItemList
                    title={"📋 List of Features"}
                    data={features}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default FeaturesPage
