import {ChangeEvent} from "react";
import {Tenant} from "./tenantInterfaces.ts";

export interface ListActionButtonsProps {
    t: Tenant
    handleEdit: (t: Tenant) => void
    handleDelete: (id: string) => void
}

export interface FormActionButtonProps {
    handleSubmit: () => void
    editId: string | null
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DynamicFormProps<T extends Record<string, any>> {
    data: T;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    editId: string | null;
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