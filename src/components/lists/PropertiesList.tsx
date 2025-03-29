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
                {properties.map((properties) => (
                    <Box
                        key={properties.id}
                        p={5}
                        borderWidth="1px"
                        borderRadius="lg"
                        shadow="sm"
                        w="100%"
                        bg="gray.50"
                    >
                        <Text
                            fontWeight="bold"
                            fontSize="lg"
                        >
                            {properties.name} – {properties.street} {properties.house_number},
                            {properties.postal_code} {properties.city}
                        </Text>
                        <Text fontSize="sm">
                            🏗️ Year of construction: {properties.year_of_construction} |
                            Flats: {properties.flats_amount} |
                            Park Spaces: {properties.park_spaces_amount}
                        </Text>
                        <Text fontSize="sm">👤 Owner: {properties.owner}</Text>
                        <ListActionButtons
                            item={properties}
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