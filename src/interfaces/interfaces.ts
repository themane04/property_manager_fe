export interface Tenant {
    id: string
    first_name: string
    last_name: string
    birthday: string
    email: string
    phone_number: string
    street: string
    house_number: string
    postal_code: string
    city: string
}

export interface Property {
    id: string
    name: string
    street: string
    house_number: string
    postal_code: string
    city: string
    year_of_construction: string
    flats_amount: string
    park_spaces_amount: string
    owner: string
}

export interface Feature {
    id: string
    name: string
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
    properties: string
    features: string[]
}

export interface Contract {
    id: string
    tenant: string
    rental_unit: string
    start_of_contract: string
    end_of_contract: string
    rent: string
    deposit: string
    status: string
}

export interface Payment {
    id: string
    rental_contract: string
    date: string
    amount: string
    status: string
    payment_method: string
}

export interface MaintenanceRequest {
    id: string
    rental_unit: string
    description: string
    status: string
    created_at: string
    assigned_craftsman: string
}
