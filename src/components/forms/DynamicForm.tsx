import {Button, FormControl, FormLabel, Input,} from '@chakra-ui/react';
import {DynamicFormProps} from "../../interfaces/commonInterfaces.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
const DynamicForm = <T extends Record<string, any>>({
                                                        data,
                                                        onChange,
                                                        onSubmit,
                                                        submitLabel = 'Submit',
                                                    }: DynamicFormProps<T>) => {
    return (
        <>
            {Object.entries(data).map(([key, value]) => (
                <FormControl key={key} isRequired>
                    <FormLabel textTransform="capitalize">
                        {key.replace(/_/g, ' ')}
                    </FormLabel>
                    <Input
                        name={key}
                        value={value}
                        onChange={onChange}
                    />
                </FormControl>
            ))}
            <Button colorScheme="blue" onClick={onSubmit}>
                {submitLabel}
            </Button>
        </>
    );
};

export default DynamicForm;
