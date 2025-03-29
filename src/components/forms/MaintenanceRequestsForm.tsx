import {Button, FormControl, FormLabel, Input, Select} from "@chakra-ui/react";
import {MaintenanceRequestsFormProps} from "../../interfaces/maintenanceRequestInterfaces.ts";

const MaintenanceRequestsForm = ({
                                     form,
                                     rentalUnits,
                                     handleChange,
                                     handleSubmit,
                                     editId,
                                 }: MaintenanceRequestsFormProps) => {
    return (
        <>
            <FormControl isRequired>
                <FormLabel>Mietobjekt</FormLabel>
                <Select name="mietobjekt" value={form.rental_unit} onChange={handleChange}>
                    {rentalUnits.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.designation}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Beschreibung</FormLabel>
                <Input name="beschreibung" value={form.description} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select name="status" value={form.status} onChange={handleChange}>
                    <option value="offen">offen</option>
                    <option value="in Bearbeitung">in Bearbeitung</option>
                    <option value="erledigt">erledigt</option>
                    <option value="dringend">dringend</option>
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Erstellt am</FormLabel>
                <Input type="date" name="erstellt_am" value={form.created_at} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Zugewiesener Handwerker</FormLabel>
                <Input
                    name="zugewiesener_handwerker"
                    value={form.assigned_craftsman}
                    onChange={handleChange}
                />
            </FormControl>

            <Button colorScheme="blue" onClick={handleSubmit}>
                {editId ? 'Aktualisieren' : 'Erstellen'}
            </Button>
        </>
    );
}

export default MaintenanceRequestsForm;