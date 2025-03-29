import {
    Contract,
    Feature,
    MaintenanceRequest,
    Payment,
    Property,
    RentalUnit,
    Tenant
} from "../interfaces/tenant.interfaces.ts";

export const initialTenant: Omit<Tenant, 'id'> = {
    first_name: '',
    last_name: '',
    birthday: '',
    email: '',
    phone_number: '',
    street: '',
    house_number: '',
    postal_code: '',
    city: '',
}

export const initialProperty: Omit<Property, 'id'> = {
    name: '',
    street: '',
    house_number: '',
    postal_code: '',
    city: '',
    year_of_construction: '',
    flats_amount: '',
    park_spaces_amount: '',
    owner: '',
}

export const initialFeature: Omit<Feature, 'id'> = {
    name: '',
}

export const initialUnit: Omit<RentalUnit, 'id'> = {
    designation: '',
    type: 'Flat',
    area_m2: '',
    number_of_rooms: '',
    rent: '',
    available_from: '',
    status: 'free',
    properties: '',
    tenant: '',
    features: [],
}

export const initialContract: Omit<Contract, 'id'> = {
    tenant: '',
    rental_unit: '',
    start_of_contract: '',
    end_of_contract: '',
    rent: '',
    deposit: '',
    status: 'active',
}

export const initialPayment: Omit<Payment, 'id'> = {
    rental_contract: '',
    date: '',
    amount: '',
    status: 'paid',
    payment_method: 'Bank transfer',
}

export const initialRequest: Omit<MaintenanceRequest, 'id'> = {
    rental_unit: '',
    description: '',
    status: 'open',
    created_at: '',
    assigned_craftsman: '',
}