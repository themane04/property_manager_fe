import {Button} from "@chakra-ui/react";
import {FormActionButtonProps} from "../../interfaces/commonInterfaces.ts";

const FormActionButton = ({
                              handleSubmit,
                              editId,
                          }: FormActionButtonProps) => {
    return (
        <Button
            colorScheme="blue"
            onClick={handleSubmit}
        >
            {editId ? 'Update' : 'Create'}
        </Button>
    );
}

export default FormActionButton;