import {Box, Button, Heading, HStack, Text, VStack} from '@chakra-ui/react';
import {ItemListProps} from "../interfaces/common.interfaces.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ItemList = ({title, data, onEdit, onDelete}: ItemListProps<any>) => {
    return (
        <>
            <Heading
                size="md"
                mb={4}
            >
                {title}
            </Heading>
            <VStack
                spacing={4}
                align="stretch"
            >
                {data.map((item: any) => (
                    <Box
                        key={item.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        shadow="sm"
                        bg="gray.50"
                    >
                        <Text fontWeight="semibold">{item.name}</Text>
                        <HStack mt={2}>
                            <Button
                                size="sm"
                                colorScheme="teal"
                                onClick={() => onEdit(item)}
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                colorScheme="red"
                                onClick={() => onDelete(item.id)}
                            >
                                Delete
                            </Button>
                        </HStack>
                    </Box>
                ))}
            </VStack>
        </>
    );
};

export default ItemList;
