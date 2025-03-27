import {UseToastOptions, useToast} from "@chakra-ui/react";

const toastOptions: UseToastOptions = {
    duration: 3000,
    position: "top-right",
};

export const showErrorToast = (
    toast: ReturnType<typeof useToast>,
    description: string,
) => {
    toast({
        description: description,
        status: "error",
        ...toastOptions,
    });
};

export const showSuccessToast = (
    toast: ReturnType<typeof useToast>,
    description: string,
) => {
    toast({
        description: description,
        status: "success",
        ...toastOptions,
    });
};

export const showInfoToast = (
    toast: ReturnType<typeof useToast>,
    description: string,
    duration?: number,
) => {
    toast({
        description: description,
        status: "info",
        ...toastOptions,
        duration: duration || 3000,
    });
};

export const showWarningToast = (
    toast: ReturnType<typeof useToast>,
    description: string,
    duration?: number,
) => {
    toast({
        description: description,
        status: "warning",
        ...toastOptions,
        duration: duration || 3000,
    });
};
