export interface BaseItem {
    id: string | number;
    name: string;
}

export interface ItemListProps<T extends BaseItem> {
    title: string;
    data: T[];
    onEdit: (item: T) => void;
    onDelete: (id: T['id']) => void;
}