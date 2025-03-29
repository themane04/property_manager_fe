import {Button, HStack} from "@chakra-ui/react";
import {ListActionButtonsProps} from "../../interfaces/commonInterfaces.ts";


const ListActionButtons = <T extends { id: string }>({
                                                         item,
                                                         handleEdit,
                                                         handleDelete,
                                                     }: ListActionButtonsProps<T>) => {
    return (
        <HStack mt={3}>
            <Button size="sm" colorScheme="teal" onClick={() => handleEdit(item)}>
                Edit
            </Button>
            <Button size="sm" colorScheme="red" onClick={() => handleDelete(item.id)}>
                Delete
            </Button>
        </HStack>
    );
}

export default ListActionButtons;