import {Box, Heading, Text, VStack} from "@chakra-ui/react";
import {TenantsListProps} from "../../interfaces/tenantInterfaces.ts";
import ListActionButtons from "./ListActionButtons.tsx";

const TenantsList = ({
                         title,
                         tenants,
                         handleEdit,
                         handleDelete
                     }: TenantsListProps) => {
    return (
        <>
            <Heading
                size="md"
                mb={4}
            >
                {title}
            </Heading>
            <VStack align="stretch" spacing={4}>
                {tenants.map(t => (
                    <Box
                        key={t.id}
                        p={5}
                        borderWidth="1px"
                        borderRadius="lg"
                        shadow="sm"
                        bg="gray.50"
                        _hover={{shadow: 'md'}}
                    >
                        <Text fontWeight="bold" fontSize="lg" color="gray.800">
                            {t.first_name} {t.last_name}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            📧 {t.email}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            📍 {t.street} {t.house_number}, {t.postal_code} {t.city}
                        </Text>
                        <ListActionButtons
                            t={t}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </Box>
                ))}
            </VStack>
        </>
    );
}

export default TenantsList;