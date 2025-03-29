import {RentalUnit} from "./rental-units.interfaces.ts";
import * as React from "react";

export interface MaintenanceRequestsFormProps {
    form: Omit<MaintenanceRequest, "id">
    rentalUnits: RentalUnit[]
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: () => void
    editId: string | null
}

export interface MaintenanceRequest {
    id: string
    rental_unit: string
    description: string
    status: string
    created_at: string
    assigned_craftsman: string
}