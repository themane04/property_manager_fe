import {Box, Text, VStack} from '@chakra-ui/react';
import {RentalContractsListProps} from "../../interfaces/rentalContractsInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import ListActionButtons from "./ListActionButtons.tsx";

const RentalContractsList = ({
                                 title,
                                 contracts,
                                 handleEdit,
                                 handleDelete,
                             }: RentalContractsListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack align="stretch" spacing={4}>
                {contracts.map((contract) => (
                    <Box
                        key={contract.id}
                        p={5}
                        borderWidth="1px"
                        borderRadius="lg"
                        shadow="sm"
                        bg="gray.50"
                        _hover={{shadow: 'md'}}
                    >
                        <Text fontWeight="bold" fontSize="lg" color="gray.800">
                            📄 Contract ({contract.status})
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            🧑 Tenant ID: {contract.tenant.id}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            🏠 Unit ID: {contract.rental_unit.id}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            📅 From: {contract.start_of_contract} – To: {contract.end_of_contract}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
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
