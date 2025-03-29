import {useToast,} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {initialProperty} from "../utils/initialStateUtil.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toastUtil.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {Property} from "../interfaces/propertiesInterfaces.ts";
import DynamicForm from "../components/forms/DynamicForm.tsx";
import PropertiesList from "../components/lists/PropertiesList.tsx";
import {environments} from "../interfaces/environments.ts";

const PropertiesPage = () => {
    const [properties, setProperties] = useState<Property[]>([])
    const [form, setForm] = useState(initialProperty)
    const [editId, setEditId] = useState<string | null>(null)
    const toast = useToast()

    const fetchProperties = () => {
        axios
            .get(`${environments.backendApiUrl}${environments.api.properties}`)
            .then((res) => setProperties(res.data))
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

        const baseUrl = `${environments.backendApiUrl}${environments.api.properties}`;
        const action = editId
            ? axios.patch(`${baseUrl}/${editId}`, payload)
            : axios.post(baseUrl, payload)

        action
            .then(() => {
                showSuccessToast(toast, editId ? 'Property successfully updated' : 'Property successfully created')
                setForm(initialProperty)
                setEditId(null)
                fetchProperties()
            })
            .catch((err) => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios
            .delete(`${environments.backendApiUrl}${environments.api.properties}/${id}`)
            .then(() => {
                fetchProperties()
                showInfoToast(toast, 'Property successfully deleted')
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
                    <DynamicForm
                        data={form}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        editId={editId}
                    />
                </InnerPageLayout>

                <PropertiesList
                    title={"📋 List of Properties"}
                    properties={properties}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default PropertiesPage
