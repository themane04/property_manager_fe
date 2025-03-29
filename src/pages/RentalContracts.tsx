import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Tenant} from "../interfaces/tenant.interfaces.ts";
import {initialContract} from "../utils/initial-state.util.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toast.util.ts";
import PageLayout from "../components/PageLayout.tsx";
import * as React from "react";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {RentalContract} from "../interfaces/contracts.interfaces.ts";
import {RentalUnit} from "../interfaces/rental-units.interfaces.ts";
import ItemList from "../components/UpdateDeleteButtons.tsx";


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
                    <FormControl isRequired>
                        <FormLabel>Mieter</FormLabel>
                        <Select name="mieter" value={form.tenant} onChange={handleChange}>
                            {tenants.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.first_name} {t.last_name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Mietobjekt</FormLabel>
                        <Select name="mietobjekt" value={form.rental_unit} onChange={handleChange}>
                            {rentalUnits.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.designation} – {u.type}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Vertragsbeginn</FormLabel>
                        <Input type="date" name="vertragsbeginn" value={form.start_of_contract}
                               onChange={handleChange}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Vertragsende</FormLabel>
                        <Input type="date" name="vertragsende" value={form.end_of_contract}
                               onChange={handleChange}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Mietzins</FormLabel>
                        <Input name="mietzins" value={form.rent} onChange={handleChange}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Kaution</FormLabel>
                        <Input name="kaution" value={form.deposit} onChange={handleChange}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Status</FormLabel>
                        <Select name="status" value={form.status} onChange={handleChange}>
                            <option value="aktiv">aktiv</option>
                            <option value="beendet">beendet</option>
                        </Select>
                    </FormControl>

                    <Button colorScheme="blue" onClick={handleSubmit}>
                        {editId ? 'Aktualisieren' : 'Erstellen'}
                    </Button>
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
