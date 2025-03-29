import {ChangeEvent} from "react";

export interface DynamicFormProps<T extends Record<string, any>> {
    data: T;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    submitLabel?: string;
}

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