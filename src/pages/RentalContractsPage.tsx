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
import {RentalUnit} from "../interfaces/rentalUnitsInterfaces.ts";
import RentalContractsForm from "../components/forms/RentalContractsForm.tsx";
import RentalContractsList from "../components/lists/RentalContractsList.tsx";
import {environments} from "../interfaces/environments.ts";


const RentalContractsPage = () => {
    const [contracts, setContracts] = useState<RentalContract[]>([])
    const [form, setForm] = useState(initialContract)
    const [editId, setEditId] = useState<string | null>(null)

    const [tenants, setTenants] = useState<Tenant[]>([])
    const [rentalUnits, setRentalUnits] = useState<RentalUnit[]>([])

    const toast = useToast()

    const fetchAll = () => {
        axios.get(`${environments.backendApiUrl}${environments.api.rental_contracts}`).then((res) => setContracts(res.data))
        axios.get(`${environments.backendApiUrl}${environments.api.tenants}`).then((res) => setTenants(res.data))
        axios.get(`${environments.backendApiUrl}${environments.api.rental_units}`).then((res) => setRentalUnits(res.data))
    }

    useEffect(() => {
        fetchAll()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        if (name === "tenant") {
            const selectedTenant = tenants.find((t) => t.id === value);
            if (selectedTenant) {
                setForm((prev) => ({...prev, tenant: selectedTenant}));
            }
        } else if (name === "rental_unit") {
            const selectedUnit = rentalUnits.find((u) => u.id === value);
            if (selectedUnit) {
                setForm((prev) => ({...prev, rental_unit: selectedUnit}));
            }
        } else {
            setForm((prev) => ({...prev, [name]: value}));
        }
    };

    const handleSubmit = () => {
        const payload = {
            tenant_id: form.tenant.id,
            rental_unit_id: form.rental_unit.id,
            start_of_contract: form.start_of_contract,
            end_of_contract: form.end_of_contract,
            rent: Number(form.rent),
            deposit: Number(form.deposit),
            status: form.status,
        };

        const baseUrl = `${environments.backendApiUrl}${environments.api.rental_contracts}`;
        const action = editId
            ? axios.patch(`${baseUrl}/${editId}`, payload)
            : axios.post(baseUrl, payload)

        action
            .then(() => {
                showSuccessToast(toast, editId
                    ? 'Rental Contract successfully updated'
                    : 'Rental Contract successfully created'
                )
                setForm(initialContract)
                setEditId(null)
                fetchAll()
            })
            .catch((err) => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios
            .delete(`${environments.backendApiUrl}${environments.api.rental_contracts}/${id}`)
            .then(() => {
                fetchAll()
                showInfoToast(toast, 'Rental Contract successfully deleted')
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

                <RentalContractsList
                    title={"📋 List of Rental Contracts"}
                    contracts={contracts}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default RentalContractsPage;
