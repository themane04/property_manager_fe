import {Box, Text, VStack} from "@chakra-ui/react";
import {PaymentsListProps} from "../../interfaces/paymentsInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import ListActionButtons from "./ListActionButtons.tsx";

const PaymentsList = ({
                          title,
                          payments,
                          handleEdit,
                          handleDelete,
                      }: PaymentsListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack align="stretch" spacing={4}>
                {payments.map((p) => (
                    <Box
                        key={p.id}
                        p={5}
                        borderWidth="1px"
                        borderRadius="lg"
                        shadow="sm"
                        bg="gray.50"
                        _hover={{shadow: 'md'}}
                    >
                        <Text fontWeight="bold" fontSize="lg" color="gray.800">
                            💸 Payment of CHF {p.amount}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            📅 Date: {p.date}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            📄 Contract ID: {p.rental_contract}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            ✅ Status: {p.status}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            💳 Method: {p.payment_method}
                        </Text>

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
};

export default PaymentsList;