import {ChangeEvent} from "react";

import {IconType} from "react-icons";

export interface RoutesProps {
    label: string
    path: string
    icon: IconType;
    color: string
}

export interface ListActionButtonsProps<T extends { id: string }> {
    item: T;
    handleEdit: (item: T) => void;
    handleDelete: (id: string) => void;
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