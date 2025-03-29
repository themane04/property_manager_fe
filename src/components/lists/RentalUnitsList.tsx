import {Box, Text, VStack} from '@chakra-ui/react';
import {RentalUnitsListProps} from "../../interfaces/rentalUnitsInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import ListActionButtons from "./ListActionButtons.tsx";

const RentalUnitsList = ({
                             title,
                             units,
                             handleEdit,
                             handleDelete,
                         }: RentalUnitsListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack align="stretch" spacing={4}>
                {units.map((unit) => (
                    <Box
                        key={unit.id}
                        p={5}
                        borderWidth="1px"
                        borderRadius="lg"
                        shadow="sm"
                        bg="gray.50"
                        _hover={{shadow: 'md'}}
                    >
                        <Text fontWeight="bold" fontSize="lg" color="gray.800">
                            🏷️ {unit.designation}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            🏠 Type: {unit.type} | Rooms: {unit.number_of_rooms} | Area: {unit.area_m2} m²
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            💰 Rent: {unit.rent} | Status: {unit.status}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            📅 Available from: {unit.available_from}
                        </Text>
                        <ListActionButtons
                            item={unit}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </Box>
                ))}
            </VStack>
        </>
    );
};

export default RentalUnitsList;
