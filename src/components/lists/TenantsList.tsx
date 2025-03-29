import {Box, Text, VStack} from "@chakra-ui/react";
import {TenantsListProps} from "../../interfaces/tenantInterfaces.ts";
import ListActionButtons from "./ListActionButtons.tsx";
import ListTitle from "./ListTitle.tsx";

const TenantsList = ({
                         title,
                         tenants,
                         handleEdit,
                         handleDelete
                     }: TenantsListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack align="stretch" spacing={4}>
                {tenants.map(tenant => (
                    <Box
                        key={tenant.id}
                        p={5}
                        borderWidth="1px"
                        borderRadius="lg"
                        shadow="sm"
                        bg="gray.50"
                        _hover={{shadow: 'md'}}
                    >
                        <Text
                            fontWeight="bold"
                            fontSize="lg"
                            color="gray.800"
                        >
                            {tenant.first_name} {tenant.last_name}
                        </Text>
                        <Text
                            fontSize="sm"
                            color="gray.600"
                        >
                            📧 {tenant.email}
                        </Text>
                        <Text
                            fontSize="sm"
                            color="gray.600"
                        >
                            📍 {tenant.street} {tenant.house_number}, {tenant.postal_code} {tenant.city}
                        </Text>
                        <ListActionButtons
                            item={tenant}
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