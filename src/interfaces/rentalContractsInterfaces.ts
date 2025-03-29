import {Tenant} from "./tenantInterfaces.ts";
import {RentalUnit} from "./rentalUnitsInterfaces.ts";
import * as React from "react";

export interface RentalContractsListProps {
    title: string;
    contracts: RentalContract[];
    handleEdit: (contract: RentalContract) => void;
    handleDelete: (id: string) => void;
}

export interface RentalContractFormProps {
    form: Omit<RentalContract, "id">
    tenants: Tenant[]
    rentalUnits: RentalUnit[]
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: () => void
    editId: string | null
}

export interface RentalContract {
    id: string
    tenant: Tenant
    rental_unit: RentalUnit
    start_of_contract: string
    end_of_contract: string
    rent: string
    deposit: string
    status: string
}
