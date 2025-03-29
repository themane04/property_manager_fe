import {Button, Checkbox, CheckboxGroup, FormControl, FormLabel, Input, Select, VStack} from "@chakra-ui/react";
import {RentalUnisFormProps} from "../../interfaces/rental-units.interfaces.ts";

const RentalUnitsForm = ({
                             form,
                             setForm,
                             tenants,
                             properties,
                             features,
                             handleChange,
                             handleSubmit,
                             editId
                         }: RentalUnisFormProps) => {
    return (
        <>
            <FormControl isRequired>
                <FormLabel>Bezeichnung</FormLabel>
                <Input name="bezeichnung" value={form.designation} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Typ</FormLabel>
                <Select name="typ" value={form.type} onChange={handleChange}>
                    <option value="Wohnung">Wohnung</option>
                    <option value="Büro">Büro</option>
                    <option value="Laden">Laden</option>
                    <option value="Penthouse">Penthouse</option>
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Fläche (m²)</FormLabel>
                <Input name="flaeche_m2" value={form.area_m2} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Zimmeranzahl</FormLabel>
                <Input name="zimmeranzahl" value={form.number_of_rooms} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Miete (CHF)</FormLabel>
                <Input name="miete" value={form.rent} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Verfügbar ab</FormLabel>
                <Input type="date" name="verfuegbar_ab" value={form.available_from}
                       onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select name="status" value={form.status} onChange={handleChange}>
                    <option value="frei">frei</option>
                    <option value="vermietet">vermietet</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Mieter</FormLabel>
                <Select name="mieter" value={form.tenant || ''} onChange={handleChange}
                        placeholder="Kein Mieter">
                    {tenants.map(t => (
                        <option key={t.id} value={t.id}>
                            {t.first_name} {t.last_name}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Liegenschaft</FormLabel>
                <Select name="liegenschaft" value={form.properties || ''} onChange={handleChange}>
                    {properties.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name} – {p.city}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Ausstattungen</FormLabel>
                <CheckboxGroup
                    colorScheme="blue"
                    value={form.features || []}
                    onChange={(values) =>
                        setForm((prev) => ({
                            ...prev,
                            features: values as string[],
                        }))
                    }
                >
                    <VStack align="start">
                        {features.map((f) => (
                            <Checkbox key={f.id} value={f.id}>
                                {f.name}
                            </Checkbox>
                        ))}
                    </VStack>
                </CheckboxGroup>
            </FormControl>


            <Button colorScheme="blue" onClick={handleSubmit}>
                {editId ? 'Aktualisieren' : 'Erstellen'}
            </Button>
        </>
    );
}

export default RentalUnitsForm;