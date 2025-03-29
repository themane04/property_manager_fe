import {useToast,} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Tenant} from "../interfaces/tenantInterfaces.ts";
import {initialUnit} from "../utils/initialStateUtil.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toastUtil.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {RentalUnit} from "../interfaces/rental-units.interfaces.ts";
import {Property} from "../interfaces/propertiesInterfaces.ts";
import {Feature} from "../interfaces/featuresInterfaces.ts";
import ItemList from "../components/ItemList.tsx";
import RentalUnitsForm from "../components/forms/RentalUnitsForm.tsx";

const RentalUnitsPage = () => {
    const [units, setUnits] = useState<RentalUnit[]>([])
    const [form, setForm] = useState(initialUnit)
    const [editId, setEditId] = useState<string | null>(null)
    const toast = useToast()
    const [tenants, setTenants] = useState<Tenant[]>([])
    const [properties, setProperties] = useState<Property[]>([])
    const [features, setFeatures] = useState<Feature[]>([])

    useEffect(() => {
        fetchUnits()

        axios.get('http://localhost:8000/api/tenants').then(res => setTenants(res.data))
        axios.get('http://localhost:8000/api/properties').then(res => setProperties(res.data))
        axios.get('http://localhost:8000/api/features').then(res => setFeatures(res.data))
    }, [])


    const fetchUnits = () => {
        axios.get('http://localhost:8000/api/rental-units').then((res) => {
            setUnits(res.data)
        })
    }

    useEffect(() => {
        fetchUnits()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        const payload = {
            ...form,
            area_m2: Number(form.area_m2),
            number_of_rooms: Number(form.number_of_rooms),
            rent: Number(form.rent),
        }

        const action = editId
            ? axios.patch(`http://localhost:8000/api/rental-units/${editId}`, payload)
            : axios.post('http://localhost:8000/api/rental-units', payload)

        action
            .then(() => {
                showSuccessToast(toast, editId
                    ? 'Rental Unit successfully updated'
                    : 'Rental Unit successfully created'
                )
                setForm(initialUnit)
                setEditId(null)
                fetchUnits()
            })
            .catch((err) => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:8000/api/rental-units/${id}`).then(() => {
            fetchUnits()
            showInfoToast(toast, 'Rental Unit successfully deleted')
        })
    }

    const handleEdit = (unit: RentalUnit) => {
        setForm({...unit})
        setEditId(unit.id)
    }

    return (
        <>
            <PageLayout title={'🏠 Rental Units'}>
                <InnerPageLayout>
                    <RentalUnitsForm
                        form={form}
                        setForm={setForm}
                        tenants={tenants}
                        properties={properties}
                        features={features}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        editId={editId}
                    />
                </InnerPageLayout>

                <ItemList
                    title={"📋 List of Rental Units"}
                    data={units}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default RentalUnitsPage
