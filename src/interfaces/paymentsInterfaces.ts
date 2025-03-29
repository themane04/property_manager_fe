import {RentalContract} from "./rentalContractsInterfaces.ts";
import * as React from "react";

export interface PaymentsListProps {
    title: string;
    payments: Payment[];
    handleEdit: (payment: Payment) => void;
    handleDelete: (id: string) => void;
}

export interface PaymentsFormProps {
    form: Omit<Payment, "id">
    contracts: RentalContract[]
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: () => void
    editId: string | null
}

export interface Payment {
    id: string
    rental_contract: string
    date: string
    amount: string
    status: string
    payment_method: string
}