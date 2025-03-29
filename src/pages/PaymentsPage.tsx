import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Select,
    Text,
    VStack,
    useToast,
} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import * as React from "react";
import {initialPayment} from "../utils/initial-state.util.ts";
import {showErrorToast, showInfoToast, showSuccessToast} from "../utils/toast.util.ts";
import PageLayout from "../components/PageLayout.tsx";
import InnerPageLayout from "../components/InnerPageLayout.tsx";
import {Payment} from "../interfaces/payments.interfaces.ts";
import {RentalContract} from "../interfaces/contracts.interfaces.ts";

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
                showSuccessToast(toast, editId ? 'Zahlung aktualisiert' : 'Zahlung erfasst')
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
            showInfoToast(toast, 'Zahlung gelöscht')
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
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Mietvertrag</FormLabel>
                            <Select name="mietvertrag" value={form.rental_contract} onChange={handleChange}>
                                {contracts.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        Vertrag {c.id.slice(-5)} – {c.status}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Datum</FormLabel>
                            <Input type="date" name="datum" value={form.date} onChange={handleChange}/>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Betrag (CHF)</FormLabel>
                            <Input name="betrag" value={form.amount} onChange={handleChange}/>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Status</FormLabel>
                            <Select name="status" value={form.status} onChange={handleChange}>
                                <option value="bezahlt">bezahlt</option>
                                <option value="offen">offen</option>
                                <option value="fehlgeschlagen">fehlgeschlagen</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Zahlungsart</FormLabel>
                            <Select name="zahlungsart" value={form.payment_method} onChange={handleChange}>
                                <option value="Banküberweisung">Banküberweisung</option>
                                <option value="Kreditkarte">Kreditkarte</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Lastschrift">Lastschrift</option>
                            </Select>
                        </FormControl>

                        <Button colorScheme="blue" onClick={handleSubmit}>
                            {editId ? 'Aktualisieren' : 'Erstellen'}
                        </Button>
                    </VStack>
                </InnerPageLayout>

                <Heading size="md" mb={4}>
                    📋 Alle Zahlungen
                </Heading>
                <VStack spacing={4}>
                    {payments.map((p) => (
                        <Box key={p.id} p={5} borderWidth="1px" borderRadius="lg" shadow="sm" w="100%" bg="gray.50">
                            <Text>
                                💳 CHF {p.amount} – {p.payment_method}
                            </Text>
                            <Text>
                                📅 {p.date} | Status: {p.status}
                            </Text>
                            <Text>Vertrag: {p.rental_contract}</Text>
                            <HStack mt={3}>
                                <Button size="sm" colorScheme="teal" onClick={() => handleEdit(p)}>
                                    Bearbeiten
                                </Button>
                                <Button size="sm" colorScheme="red" onClick={() => handleDelete(p.id)}>
                                    Löschen
                                </Button>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            </PageLayout>
        </>
    )
}

export default PaymentsPage
