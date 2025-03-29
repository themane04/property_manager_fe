import {useToast,} from '@chakra-ui/react'
import * as React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {initialPayment} from "../utils/initialStateUtil.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toastUtil.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {Payment} from "../interfaces/paymentsInterfaces.ts";
import {RentalContract} from "../interfaces/rentalContractsInterfaces.ts";
import PaymentsForm from "../components/forms/PaymentsForm.tsx";
import PaymentsList from "../components/lists/PaymentsList.tsx";
import {environments} from "../services/environments.ts";

const PaymentsPage = () => {
    const [payments, setPayments] = useState<Payment[]>([])
    const [form, setForm] = useState(initialPayment)
    const [editId, setEditId] = useState<string | null>(null)
    const [contracts, setContracts] = useState<RentalContract[]>([])
    const toast = useToast()

    const fetchAll = () => {
        axios
            .get(`${environments.backendApiUrl}${environments.api.payments}`)
            .then((res) => setPayments(res.data))

        axios
            .get(`${environments.backendApiUrl}${environments.api.rental_contracts}`)
            .then((res) => setContracts(res.data))
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
            amount: Number(form.amount),
        }

        const baseUrl = `${environments.backendApiUrl}${environments.api.payments}`;
        const action = editId
            ? axios.patch(`${baseUrl}/${editId}`, payload)
            : axios.post(baseUrl, payload)

        action
            .then(() => {
                showSuccessToast(toast, editId ? 'Payment successfully updated' : 'Payment successfully created')
                setForm(initialPayment)
                setEditId(null)
                fetchAll()
            })
            .catch((err) => {
                showErrorToast(toast, err.message)
            })
    }

    const handleDelete = (id: string) => {
        axios
            .delete(`${environments.backendApiUrl}${environments.api.payments}/${id}`)
            .then(() => {
                fetchAll()
                showInfoToast(toast, 'Payment successfully deleted')
            })
    }

    const handleEdit = (p: Payment) => {
        setForm({...p})
        setEditId(p.id)
    }

    return (
        <>
            <PageLayout title={'💳 Payments'}>
                <InnerPageLayout>
                    <PaymentsForm
                        form={form}
                        contracts={contracts}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        editId={editId}
                    />
                </InnerPageLayout>

                <PaymentsList
                    title="💵 List Of Payments"
                    payments={payments}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default PaymentsPage
