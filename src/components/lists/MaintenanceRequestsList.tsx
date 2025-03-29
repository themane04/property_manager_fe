import {Box, Text, VStack} from '@chakra-ui/react';
import {MaintenanceRequestsListProps} from "../../interfaces/maintenanceRequestInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import ListActionButtons from "./ListActionButtons.tsx";

const MaintenanceRequestsList = ({
                                     title,
                                     requests,
                                     handleEdit,
                                     handleDelete,
                                 }: MaintenanceRequestsListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack align="stretch" spacing={4}>
                {requests.map((r) => (
                    <Box
                        key={r.id}
                        p={5}
                        borderWidth="1px"
                        borderRadius="lg"
                        shadow="sm"
                        bg="gray.50"
                        _hover={{shadow: 'md'}}
                    >
                        <Text fontWeight="bold" fontSize="lg" color="gray.800">
                            🛠️ Request – {r.status}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            🏠 Rental Unit ID: {r.rental_unit}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            📝 Description: {r.description}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            📅 Created: {r.created_at}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            👷 Assigned Craftsman: {r.assigned_craftsman || 'None'}
                        </Text>

                        <ListActionButtons
                            item={r}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </Box>
                ))}
            </VStack>
        </>
    );
};

export default MaintenanceRequestsList;
