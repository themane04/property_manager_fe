import {Tenant} from "./tenantInterfaces.ts";
import {Property} from "./propertiesInterfaces.ts";
import {Feature} from "./featuresInterfaces.ts";
import * as React from "react";

export interface RentalUnitsListProps {
    title: string
    units: RentalUnit[]
    handleEdit: (unit: RentalUnit) => void
    handleDelete: (id: string) => void
}

export interface RentalUnisFormProps {
    form: Omit<RentalUnit, "id">
    setForm: React.Dispatch<React.SetStateAction<Omit<RentalUnit, "id">>>
    tenants: Tenant[]
    properties: Property[]
    features: Feature[]
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: () => void
    editId: string | null
}

export interface RentalUnit {
    id: string
    designation: string
    type: string
    area_m2: string
    number_of_rooms: string
    rent: string
    available_from: string
    status: string
    tenant: string
    property: string
    features: string[]
}
