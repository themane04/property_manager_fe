import ListTitle from "./ListTitle.tsx";
import {Box, Text, VStack} from "@chakra-ui/react";
import {PropertiesListProps} from "../../interfaces/propertiesInterfaces.ts";
import ListActionButtons from "./ListActionButtons.tsx";

const PropertiesList = ({
                            title,
                            properties,
                            handleEdit,
                            handleDelete
                        }: PropertiesListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack spacing={4}>
                {properties.map((p) => (
                    <Box key={p.id} p={5} borderWidth="1px" borderRadius="lg" shadow="sm" w="100%" bg="gray.50">
                        <Text fontWeight="bold" fontSize="lg">
                            {p.name} – {p.street} {p.house_number}, {p.postal_code} {p.city}
                        </Text>
                        <Text fontSize="sm">
                            🏗️ Year of construction: {p.year_of_construction} | Flats: {p.flats_amount} |
                            Park Spaces: {p.park_spaces_amount}
                        </Text>
                        <Text fontSize="sm">👤 Owner: {p.owner}</Text>
                        <ListActionButtons
                            item={p}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </Box>
                ))}
            </VStack>
        </>
    );
}

export default PropertiesList;