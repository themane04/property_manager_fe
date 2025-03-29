import {Box, Text, VStack} from "@chakra-ui/react";
import {PaymentsListProps} from "../../interfaces/paymentsInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import ListActionButtons from "./ListActionButtons.tsx";
import {
    listComponentBoxStyle,
    listComponentMainTextStyle,
    listComponentTextStyle,
    listComponentVStackStyle
} from "../../styles/ListComponentStyles.ts";

const PaymentsList = ({
                          title,
                          payments,
                          handleEdit,
                          handleDelete,
                      }: PaymentsListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack sx={listComponentVStackStyle}>
                {payments.map((p) => (
                    <Box
                        key={p.id}
                        sx={listComponentBoxStyle}
                    >
                        <Text sx={listComponentMainTextStyle}>
                            💸 Payment of CHF {p.amount}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            📅 Date: {p.date}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            📄 Contract ID: {p.rental_contract}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            ✅ Status: {p.status}
                        </Text>
                        <Text sx={listComponentTextStyle}>
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