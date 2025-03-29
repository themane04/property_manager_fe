import {useToast,} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {initialRequest} from "../utils/initialStateUtil.ts";
import {showErrorToast, showSuccessToast} from "../utils/toastUtil.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {MaintenanceRequest} from "../interfaces/maintenanceRequestInterfaces.ts";
import {RentalUnit} from "../interfaces/rental-units.interfaces.ts";
import ItemList from "../components/UpdateDeleteButtons.tsx";
import MaintenanceRequestsForm from "../components/forms/MaintenanceRequestsForm.tsx";

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
                showSuccessToast(toast, editId
                    ? 'Maintenance Request successfully updated'
                    : 'Maintenance Request successfully created'
                )
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
            showSuccessToast(toast, 'Maintenance Request successfully deleted')
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
                    <MaintenanceRequestsForm
                        form={form}
                        rentalUnits={rentalUnits}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        editId={editId}
                    />
                </InnerPageLayout>

                <ItemList
                    title={"📋 List of Maintenance Requests"}
                    data={requests}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default MaintenanceRequestsPage
