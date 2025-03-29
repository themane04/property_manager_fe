import {Button, FormControl, FormLabel, Input, Select} from "@chakra-ui/react";
import {RentalContractFormProps} from "../../interfaces/rentalContractsInterfaces.ts";

const RentalContractsForm = ({
                                form,
                                tenants,
                                rentalUnits,
                                handleChange,
                                handleSubmit,
                                editId,
                            }: RentalContractFormProps) => {
    return (
        <>
            <FormControl isRequired>
                <FormLabel>Mieter</FormLabel>
                <Select name="mieter" value={form.tenant} onChange={handleChange}>
                    {tenants.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.first_name} {t.last_name}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Mietobjekt</FormLabel>
                <Select name="mietobjekt" value={form.rental_unit} onChange={handleChange}>
                    {rentalUnits.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.designation} – {u.type}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Vertragsbeginn</FormLabel>
                <Input type="date" name="vertragsbeginn" value={form.start_of_contract}
                       onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Vertragsende</FormLabel>
                <Input type="date" name="vertragsende" value={form.end_of_contract}
                       onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Mietzins</FormLabel>
                <Input name="mietzins" value={form.rent} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Kaution</FormLabel>
                <Input name="kaution" value={form.deposit} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select name="status" value={form.status} onChange={handleChange}>
                    <option value="aktiv">aktiv</option>
                    <option value="beendet">beendet</option>
                </Select>
            </FormControl>

            <Button colorScheme="blue" onClick={handleSubmit}>
                {editId ? 'Aktualisieren' : 'Erstellen'}
            </Button>
        </>
    )
}

export default RentalContractsForm;