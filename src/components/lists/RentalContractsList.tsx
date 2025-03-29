import {Box, Text, VStack} from '@chakra-ui/react';
import {RentalContractsListProps} from "../../interfaces/rentalContractsInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import ListActionButtons from "./ListActionButtons.tsx";
import {
    listComponentBoxStyle,
    listComponentMainTextStyle,
    listComponentTextStyle,
    listComponentVStackStyle
} from "../../styles/ListComponentStyles.ts";

const RentalContractsList = ({
                                 title,
                                 contracts,
                                 handleEdit,
                                 handleDelete,
                             }: RentalContractsListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack sx={listComponentVStackStyle}>
                {contracts.map((contract) => (
                    <Box
                        key={contract.id}
                        sx={listComponentBoxStyle}
                    >
                        <Text sx={listComponentMainTextStyle}>
                            📄 Contract ({contract.status})
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            🧑 Tenant ID: {contract.tenant.id}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            🏠 Unit ID: {contract.rental_unit.id}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            📅 From: {contract.start_of_contract} – To: {contract.end_of_contract}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            💰 Rent: {contract.rent} CHF | Deposit: {contract.deposit} CHF
                        </Text>
                        <ListActionButtons
                            item={contract}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </Box>
                ))}
            </VStack>
        </>
    );
};

export default RentalContractsList;
