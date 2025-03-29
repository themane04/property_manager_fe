import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    VStack,
    useToast, CheckboxGroup, Checkbox,
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Tenant} from "../interfaces/tenant.interfaces.ts";
import {initialUnit} from "../utils/initial-state.util.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toast.util.ts";
import PageLayout from "../components/PageLayout.tsx";
import * as React from "react";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {RentalUnit} from "../interfaces/rental-units.interfaces.ts";
import {Property} from "../interfaces/properties.interfaces.ts";
import {Feature} from "../interfaces/features.interfaces.ts";
import ItemList from "../components/UpdateDeleteButtons.tsx";

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
                showSuccessToast(toast, editId ? 'Mietobjekt aktualisiert' : 'Mietobjekt erstellt')
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
            showInfoToast(toast, 'Mietobjekt gelöscht')
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
                    <FormControl isRequired>
                        <FormLabel>Bezeichnung</FormLabel>
                        <Input name="bezeichnung" value={form.designation} onChange={handleChange}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Typ</FormLabel>
                        <Select name="typ" value={form.type} onChange={handleChange}>
                            <option value="Wohnung">Wohnung</option>
                            <option value="Büro">Büro</option>
                            <option value="Laden">Laden</option>
                            <option value="Penthouse">Penthouse</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Fläche (m²)</FormLabel>
                        <Input name="flaeche_m2" value={form.area_m2} onChange={handleChange}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Zimmeranzahl</FormLabel>
                        <Input name="zimmeranzahl" value={form.number_of_rooms} onChange={handleChange}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Miete (CHF)</FormLabel>
                        <Input name="miete" value={form.rent} onChange={handleChange}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Verfügbar ab</FormLabel>
                        <Input type="date" name="verfuegbar_ab" value={form.available_from}
                               onChange={handleChange}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Status</FormLabel>
                        <Select name="status" value={form.status} onChange={handleChange}>
                            <option value="frei">frei</option>
                            <option value="vermietet">vermietet</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Mieter</FormLabel>
                        <Select name="mieter" value={form.tenant || ''} onChange={handleChange}
                                placeholder="Kein Mieter">
                            {tenants.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.first_name} {t.last_name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Liegenschaft</FormLabel>
                        <Select name="liegenschaft" value={form.properties || ''} onChange={handleChange}>
                            {properties.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} – {p.city}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Ausstattungen</FormLabel>
                        <CheckboxGroup
                            colorScheme="blue"
                            value={form.features || []}
                            onChange={(values) =>
                                setForm((prev) => ({
                                    ...prev,
                                    features: values as string[],
                                }))
                            }
                        >
                            <VStack align="start">
                                {features.map((f) => (
                                    <Checkbox key={f.id} value={f.id}>
                                        {f.name}
                                    </Checkbox>
                                ))}
                            </VStack>
                        </CheckboxGroup>
                    </FormControl>


                    <Button colorScheme="blue" onClick={handleSubmit}>
                        {editId ? 'Aktualisieren' : 'Erstellen'}
                    </Button>
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
