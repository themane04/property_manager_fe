import {useToast,} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Tenant} from "../interfaces/tenantInterfaces.ts";
import {initialContract} from "../utils/initialStateUtil.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toastUtil.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {RentalContract} from "../interfaces/rentalContractsInterfaces.ts";
import {RentalUnit} from "../interfaces/rental-units.interfaces.ts";
import ItemList from "../components/UpdateDeleteButtons.tsx";
import RentalContractsForm from "../components/forms/RentalContractsForm.tsx";


const RentalContractsPage = () => {
    const [contracts, setContracts] = useState<RentalContract[]>([])
    const [form, setForm] = useState(initialContract)
    const [editId, setEditId] = useState<string | null>(null)

    const [tenants, setTenants] = useState<Tenant[]>([])
    const [rentalUnits, setRentalUnits] = useState<RentalUnit[]>([])

    const toast = useToast()

    const fetchAll = () => {
        axios.get('http://localhost:8000/api/rental-contracts').then((res) => setContracts(res.data))
        axios.get('http://localhost:8000/api/tenants').then((res) => setTenants(res.data))
        axios.get('http://localhost:8000/api/rental-units').then((res) => setRentalUnits(res.data))
    }

    useEffect(() => {
        fetchAll()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        const payload = {
            ...form,
            rent: Number(form.rent),
            deposit: Number(form.deposit),
        }

        const action = editId
            ? axios.patch(`http://localhost:8000/api/rental-contracts/${editId}`, payload)
            : axios.post('http://localhost:8000/api/rental-contracts', payload)

        action
            .then(() => {
                showSuccessToast(toast, editId ? 'Vertrag aktualisiert' : 'Vertrag erstellt')
                setForm(initialContract)
                setEditId(null)
                fetchAll()
            })
            .catch((err) => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8000/api/rental-contracts/${id}`).then(() => {
            fetchAll()
            showInfoToast(toast, 'Vertrag gelöscht')
        })
    }

    const handleEdit = (c: RentalContract) => {
        setForm({...c})
        setEditId(c.id)
    }

    return (
        <>
            <PageLayout title={'📄 Rental Contracts'}>
                <InnerPageLayout>
                    <RentalContractsForm
                        form={form}
                        tenants={tenants}
                        rentalUnits={rentalUnits}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        editId={editId}
                    />
                </InnerPageLayout>

                <ItemList
                    title={"📋 List of Rental Contracts"}
                    data={contracts}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default RentalContractsPage
