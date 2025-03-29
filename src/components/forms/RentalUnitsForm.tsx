import {Checkbox, CheckboxGroup, FormControl, FormLabel, Input, Select, VStack} from "@chakra-ui/react";
import {RentalUnisFormProps} from "../../interfaces/rental-units.interfaces.ts";
import FormActionButton from "./FormActionButton.tsx";

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
                <FormLabel>Designation</FormLabel>
                <Input name="designation" value={form.designation} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Type</FormLabel>
                <Select name="type" value={form.type} onChange={handleChange}>
                    <option value="Flat">Flat</option>
                    <option value="Office">Office</option>
                    <option value="Shop">Shop</option>
                    <option value="Penthouse">Penthouse</option>
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Area (m²)</FormLabel>
                <Input name="area_m2" value={form.area_m2} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Number Of Rooms</FormLabel>
                <Input name="number_of_rooms" value={form.number_of_rooms} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Rent (CHF)</FormLabel>
                <Input name="rent" value={form.rent} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Available From</FormLabel>
                <Input type="date" name="available_from" value={form.available_from}
                       onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select name="status" value={form.status} onChange={handleChange}>
                    <option value="rented">rented</option>
                    <option value="free">free</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Tenant</FormLabel>
                <Select name="tenant" value={form.tenant || ''} onChange={handleChange} placeholder="No tenant">
                    {tenants.map(t => (
                        <option key={t.id} value={t.id}>
                            {t.first_name} {t.last_name}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Properties</FormLabel>
                <Select name="properties" value={form.properties || ''} onChange={handleChange}>
                    {properties.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name} – {p.city}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Features</FormLabel>
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

            <FormActionButton
                handleSubmit={handleSubmit}
                editId={editId}
            />
        </>
    );
}

export default RentalUnitsForm;