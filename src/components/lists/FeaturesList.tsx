import {FeaturesListProps} from "../../interfaces/featuresInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import {Box, Text, VStack} from "@chakra-ui/react";
import ListActionButtons from "./ListActionButtons.tsx";

const FeaturesList = ({
                          title,
                          features,
                          handleEdit,
                          handleDelete
                      }: FeaturesListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack spacing={4} align="stretch">
                {features.map((f) => (
                    <Box key={f.id} p={4} borderWidth="1px" borderRadius="lg" shadow="sm" bg="gray.50">
                        <Text fontWeight="semibold">{f.name}</Text>
                        <ListActionButtons
                            item={f}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </Box>
                ))}
            </VStack>
        </>
    );
}

export default FeaturesList;