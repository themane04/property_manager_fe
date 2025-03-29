import {useToast} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Tenant} from "../interfaces/tenantInterfaces.ts";
import {initialTenant} from "../utils/initialStateUtil.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toastUtil.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import DynamicForm from "../components/forms/DynamicForm.tsx";
import TenantsList from "../components/lists/TenantsList.tsx";
import {environments} from "../services/environments.ts";

const TenantsPage = () => {
    const [tenants, setTenants] = useState<Tenant[]>([])
    const [form, setForm] = useState(initialTenant)
    const [editId, setEditId] = useState<string | null>(null)
    const toast = useToast()

    const fetchTenants = () => {
        axios.get(`${environments.backendApiUrl}${environments.api.tenants}`).then(res => {
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
        const baseUrl = `${environments.backendApiUrl}${environments.api.tenants}`;
        const action = editId
            ? axios.patch(`${baseUrl}/${editId}`, form)
            : axios.post(baseUrl, form)

        action
            .then(() => {
                showSuccessToast(toast, editId ? 'Tenant successfully updated' : 'Tenant successfully created')
                setForm(initialTenant)
                setEditId(null)
                fetchTenants()
            })
            .catch(err => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios.delete(`${environments.backendApiUrl}${environments.api.tenants}/${id}`).then(() => {
            fetchTenants()
            showInfoToast(toast, 'Tenant successfully deleted')
        })
    }

    const handleEdit = (tenant: Tenant) => {
        setForm({...tenant})
        setEditId(tenant.id)
    }

    return (
        <>
            <>
                <PageLayout title={'Tenants'}>
                    <InnerPageLayout>
                        <DynamicForm
                            data={form}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            editId={editId}
                        />
                    </InnerPageLayout>

                    <TenantsList
                        title={"👥 List Of Tenants"}
                        tenants={tenants}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </PageLayout>
            </>
        </>
    )
}

export default TenantsPage;