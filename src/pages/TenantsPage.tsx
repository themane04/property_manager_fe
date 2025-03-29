import {Button, FormControl, FormLabel, Input, useToast} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Tenant} from "../interfaces/tenant.interfaces.ts";
import {initialTenant} from "../utils/initial-state.util.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toast.util.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import ItemList from "../components/UpdateDeleteButtons.tsx";

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
                    <InnerPageLayout>
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
                            {editId ? 'Update' : 'Create'}
                        </Button>
                    </InnerPageLayout>

                    <ItemList
                        title={"📋 List of Tenants"}
                        data={tenants}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </PageLayout>
            </>
        </>
    )
}

export default TenantsPage;