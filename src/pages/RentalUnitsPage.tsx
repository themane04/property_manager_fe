import {useToast,} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Tenant} from "../interfaces/tenantInterfaces.ts";
import {initialUnit} from "../utils/initialStateUtil.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toastUtil.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {RentalUnit} from "../interfaces/rentalUnitsInterfaces.ts";
import {Property} from "../interfaces/propertiesInterfaces.ts";
import {Feature} from "../interfaces/featuresInterfaces.ts";
import RentalUnitsForm from "../components/forms/RentalUnitsForm.tsx";
import RentalUnitsList from "../components/lists/RentalUnitsList.tsx";
import {environments} from "../services/environments.ts";

const RentalUnitsPage = () => {
    const [units, setUnits] = useState<RentalUnit[]>([])
    const [form, setForm] = useState(initialUnit)
    const [editId, setEditId] = useState<string | null>(null)
    const toast = useToast()
    const [tenants, setTenants] = useState<Tenant[]>([])
    const [properties, setProperties] = useState<Property[]>([])
    const [features, setFeatures] = useState<Feature[]>([])

    const fetchUnits = () => {
        axios
            .get(`${environments.backendApiUrl}${environments.api.rental_units}`)
            .then((res) => setUnits(res.data))
    }

    useEffect(() => {
        fetchUnits()

        axios.get(`${environments.backendApiUrl}${environments.api.tenants}`).then(res => setTenants(res.data))
        axios.get(`${environments.backendApiUrl}${environments.api.properties}`).then(res => setProperties(res.data))
        axios.get(`${environments.backendApiUrl}${environments.api.features}`).then(res => setFeatures(res.data))
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

        const baseUrl = `${environments.backendApiUrl}${environments.api.rental_units}`;
        const action = editId
            ? axios.patch(`${baseUrl}/${editId}`, payload)
            : axios.post(baseUrl, payload)

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
        axios
            .delete(`${environments.backendApiUrl}${environments.api.rental_units}/${id}`)
            .then(() => {
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
            <PageLayout title={'Rental Units'}>
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

                <RentalUnitsList
                    title="🏠 List Of Rental Units"
                    units={units}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default RentalUnitsPage;
