import {FormControl, FormLabel, Input, Select, VStack} from "@chakra-ui/react";
import {PaymentsFormProps} from "../../interfaces/paymentsInterfaces.ts";
import FormActionButton from "./FormActionButton.tsx";
import {formInputStyle, formLabelStyle, formSelectStyle, formVStackStyle} from "../../styles/FormComponentStyles.ts";

const PaymentsForm = ({
                          form,
                          contracts,
                          handleChange,
                          handleSubmit,
                          editId,
                      }: PaymentsFormProps) => {
    return (
        <>
            <VStack sx={formVStackStyle}>
                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Rental Contract</FormLabel>
                    <Select
                        name="rental_contract"
                        value={form.rental_contract}
                        onChange={handleChange}
                        placeholder="Select a contract"
                        sx={formInputStyle}
                    >
                        {contracts.map((c) => (
                            <option key={c.id} value={c.id} style={formSelectStyle}>
                                Contract {c.id.slice(-5)} – {c.status}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Date</FormLabel>
                    <Input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Amount (CHF)</FormLabel>
                    <Input
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Status</FormLabel>
                    <Select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        placeholder="Select a status"
                        sx={formInputStyle}
                    >
                        <option value="paid" style={formSelectStyle}>paid</option>
                        <option value="open" style={formSelectStyle}>open</option>
                        <option value="failed" style={formSelectStyle}>failed</option>
                        <option value="cancelled" style={formSelectStyle}>cancelled</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Payment Method</FormLabel>
                    <Select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        placeholder="Select a payment method"
                        sx={formInputStyle}
                    >
                        <option value="Bank transfer" style={formSelectStyle}>Bank transfer</option>
                        <option value="Credit card" style={formSelectStyle}>Credit card</option>
                        <option value="PayPal" style={formSelectStyle}>PayPal</option>
                        <option value="Direct debit" style={formSelectStyle}>Direct debit</option>
                    </Select>
                </FormControl>

                <FormActionButton
                    handleSubmit={handleSubmit}
                    editId={editId}
                />
            </VStack>
        </>
    );
}

export default PaymentsForm;