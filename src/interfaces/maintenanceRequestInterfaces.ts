import {RentalUnit} from "./rentalUnitsInterfaces.ts";
import * as React from "react";

export interface MaintenanceRequestsListProps {
    title: string;
    requests: MaintenanceRequest[];
    handleEdit: (request: MaintenanceRequest) => void;
    handleDelete: (id: string) => void;
}

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