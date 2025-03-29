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
import ItemList from "../components/ItemList.tsx";
import PaymentsForm from "../components/forms/PaymentsForm.tsx";

const PaymentsPage = () => {
    const [payments, setPayments] = useState<Payment[]>([])
    const [form, setForm] = useState(initialPayment)
    const [editId, setEditId] = useState<string | null>(null)
    const [contracts, setContracts] = useState<RentalContract[]>([])
    const toast = useToast()

    const fetchAll = () => {
        axios.get('http://localhost:8000/api/payments').then((res) => setPayments(res.data))
        axios.get('http://localhost:8000/api/rental-contracts').then((res) => setContracts(res.data))
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

        const action = editId
            ? axios.patch(`http://localhost:8000/api/payments/${editId}`, payload)
            : axios.post('http://localhost:8000/api/payments', payload)

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
        axios.delete(`http://localhost:8000/api/payments/${id}`).then(() => {
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

                <ItemList
                    title={"📋 List of Payments"}
                    data={payments}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageLayout>
        </>
    )
}

export default PaymentsPage
