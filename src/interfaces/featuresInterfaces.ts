export interface FeaturesListProps {
    title: string
    features: Feature[]
    handleEdit: (t: Feature) => void
    handleDelete: (id: string) => void
}

export interface Feature {
    id: string
    name: string
}