import {Box, Text, VStack} from "@chakra-ui/react";
import {TenantsListProps} from "../../interfaces/tenantInterfaces.ts";
import ListActionButtons from "./ListActionButtons.tsx";
import ListTitle from "./ListTitle.tsx";
import {
    listComponentBoxStyle,
    listComponentMainTextStyle,
    listComponentTextStyle,
    listComponentVStackStyle
} from "../../styles/ListComponentStyles.ts";

const TenantsList = ({
                         title,
                         tenants,
                         handleEdit,
                         handleDelete,
                     }: TenantsListProps) => {

    return (
        <>
            <ListTitle title={title}/>
            <VStack sx={listComponentVStackStyle}>
                {tenants.map((tenant) => (
                    <Box
                        key={tenant.id}
                        sx={listComponentBoxStyle}
                    >
                        <Text sx={listComponentMainTextStyle}>
                            {tenant.first_name} {tenant.last_name}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            📧 {tenant.email}
                        </Text>
                        <Text sx={listComponentTextStyle}>
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
};


export default TenantsList;