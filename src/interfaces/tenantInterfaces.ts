export interface TenantsListProps {
    title: string
    tenants: Tenant[]
    handleEdit: (t: Tenant) => void
    handleDelete: (id: string) => void
}

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