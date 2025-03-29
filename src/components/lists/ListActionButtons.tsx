import {Button, HStack} from "@chakra-ui/react";
import {ListActionButtonsProps} from "../../interfaces/commonInterfaces.ts";

const ListActionButtons = ({
                               t,
                               handleEdit,
                               handleDelete
                           }: ListActionButtonsProps) => {
    return (
        <HStack mt={3}>
            <Button size="sm" colorScheme="teal" onClick={() => handleEdit(t)}>
                Edit
            </Button>
            <Button size="sm" colorScheme="red" onClick={() => handleDelete(t.id)}>
                Delete
            </Button>
        </HStack>
    );
}

export default ListActionButtons;