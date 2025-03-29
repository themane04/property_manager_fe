import {FormControl, FormLabel, Input, VStack,} from '@chakra-ui/react';
import {DynamicFormProps} from "../../interfaces/commonInterfaces.ts";
import FormActionButton from "./FormActionButton.tsx";
import {formInputStyle, formLabelStyle, formVStackStyle} from "../../styles/FormComponentStyles.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
const DynamicForm = <T extends Record<string, any>>({
                                                        data,
                                                        onChange,
                                                        onSubmit,
                                                        editId,
                                                    }: DynamicFormProps<T>) => {
    return (
        <VStack sx={formVStackStyle}>
            {Object.entries(data).map(([key, value]) => (
                <FormControl key={key} isRequired>
                    <FormLabel sx={formLabelStyle}>
                        {key.replace(/_/g, ' ')}
                    </FormLabel>
                    <Input
                        type={key === 'birthday' ? 'date' : 'text'}
                        name={key}
                        value={value}
                        onChange={onChange}
                        sx={formInputStyle}
                    />
                </FormControl>
            ))}
            <FormActionButton handleSubmit={onSubmit} editId={editId}/>
        </VStack>
    );
};

export default DynamicForm;
