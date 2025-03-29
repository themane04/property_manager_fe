import {Button, FormControl, FormLabel, Input, Select} from "@chakra-ui/react";
import {PaymentsFormProps} from "../../interfaces/paymentsInterfaces.ts";

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
                <FormLabel>Mietvertrag</FormLabel>
                <Select name="mietvertrag" value={form.rental_contract} onChange={handleChange}>
                    {contracts.map((c) => (
                        <option key={c.id} value={c.id}>
                            Vertrag {c.id.slice(-5)} – {c.status}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Datum</FormLabel>
                <Input type="date" name="datum" value={form.date} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Betrag (CHF)</FormLabel>
                <Input name="betrag" value={form.amount} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select name="status" value={form.status} onChange={handleChange}>
                    <option value="bezahlt">bezahlt</option>
                    <option value="offen">offen</option>
                    <option value="fehlgeschlagen">fehlgeschlagen</option>
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Zahlungsart</FormLabel>
                <Select name="zahlungsart" value={form.payment_method} onChange={handleChange}>
                    <option value="Banküberweisung">Banküberweisung</option>
                    <option value="Kreditkarte">Kreditkarte</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Lastschrift">Lastschrift</option>
                </Select>
            </FormControl>

            <Button colorScheme="blue" onClick={handleSubmit}>
                {editId ? 'Aktualisieren' : 'Erstellen'}
            </Button>
        </>
    );
}

export default PaymentsForm;