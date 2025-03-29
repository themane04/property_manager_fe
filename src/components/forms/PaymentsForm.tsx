import {FormControl, FormLabel, Input, Select} from "@chakra-ui/react";
import {PaymentsFormProps} from "../../interfaces/paymentsInterfaces.ts";
import FormActionButton from "./FormActionButton.tsx";

const PaymentsForm = ({
                          form,
                          contracts,
                          handleChange,
                          handleSubmit,
                          editId,
                      }: PaymentsFormProps) => {
    return (
        <>
            <FormControl isRequired>
                <FormLabel>Rental Contract</FormLabel>
                <Select
                    name="rental_contract"
                    value={form.rental_contract}
                    onChange={handleChange}
                    placeholder="Select a contract"
                >
                    {contracts.map((c) => (
                        <option key={c.id} value={c.id}>
                            Contract {c.id.slice(-5)} – {c.status}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="date" value={form.date} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Amount (CHF)</FormLabel>
                <Input name="amount" value={form.amount} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    placeholder="Select a status"
                >
                    <option value="paid">paid</option>
                    <option value="open">open</option>
                    <option value="failed">failed</option>
                    <option value="cancelled">cancelled</option>
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Payment Method</FormLabel>
                <Select
                    name="payment_method"
                    value={form.payment_method}
                    onChange={handleChange}
                    placeholder="Select a payment method"
                >
                    <option value="Bank transfer">Bank transfer</option>
                    <option value="Credit card">Credit card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Direct debit">Direct debit</option>
                </Select>
            </FormControl>

            <FormActionButton
                handleSubmit={handleSubmit}
                editId={editId}
            />
        </>
    );
}

export default PaymentsForm;