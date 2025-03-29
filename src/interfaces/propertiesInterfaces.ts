export interface PropertiesListProps {
    title: string
    properties: Property[]
    handleEdit: (t: Property) => void
    handleDelete: (id: string) => void
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