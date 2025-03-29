import {Box, Text, VStack} from '@chakra-ui/react';
import {MaintenanceRequestsListProps} from "../../interfaces/maintenanceRequestInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import ListActionButtons from "./ListActionButtons.tsx";
import {
    listComponentBoxStyle,
    listComponentMainTextStyle,
    listComponentTextStyle,
    listComponentVStackStyle
} from "../../styles/ListComponentStyles.ts";

const MaintenanceRequestsList = ({
                                     title,
                                     requests,
                                     handleEdit,
                                     handleDelete,
                                 }: MaintenanceRequestsListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack sx={listComponentVStackStyle}>
                {requests.map((r) => (
                    <Box
                        key={r.id}
                        sx={listComponentBoxStyle}
                    >
                        <Text sx={listComponentMainTextStyle}>
                            🛠️ Request – {r.status}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            🏠 Rental Unit ID: {r.rental_unit}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            📝 Description: {r.description}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            📅 Created: {r.created_at}
                        </Text>
                        <Text sx={listComponentTextStyle}>
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
