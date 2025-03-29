import {Checkbox, CheckboxGroup, FormControl, FormLabel, Input, Select, VStack} from "@chakra-ui/react";
import {RentalUnisFormProps} from "../../interfaces/rentalUnitsInterfaces.ts";
import FormActionButton from "./FormActionButton.tsx";
import {formInputStyle, formLabelStyle, formVStackStyle} from "../../styles/FormComponentStyles.ts";

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
            <VStack sx={formVStackStyle}>
                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Designation</FormLabel>
                    <Input
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Type</FormLabel>
                    <Select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        sx={formInputStyle}
                        placeholder="Select a type"
                    >
                        <option value="Flat">Flat</option>
                        <option value="Office">Office</option>
                        <option value="Shop">Shop</option>
                        <option value="Penthouse">Penthouse</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Area (m²)</FormLabel>
                    <Input
                        name="area_m2"
                        value={form.area_m2}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Number Of Rooms</FormLabel>
                    <Input
                        name="number_of_rooms"
                        value={form.number_of_rooms}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Rent (CHF)</FormLabel>
                    <Input
                        name="rent"
                        value={form.rent}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Available From</FormLabel>
                    <Input
                        type="date"
                        name="available_from"
                        value={form.available_from}
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
                        <option value="rented">rented</option>
                        <option value="free">free</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel sx={formLabelStyle}>Tenant</FormLabel>
                    <Select
                        name="tenant"
                        value={form.tenant || ''}
                        onChange={handleChange}
                        placeholder="Select a tenant"
                        sx={formInputStyle}
                    >
                        {tenants.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.first_name} {t.last_name}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Property</FormLabel>
                    <Select
                        name="property"
                        value={form.property}
                        onChange={handleChange}
                        placeholder="Select a property"
                        sx={formInputStyle}
                    >
                        {properties.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name} – {p.city}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel sx={formLabelStyle}>Features</FormLabel>
                    <CheckboxGroup
                        colorScheme="tale"
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
            </VStack>
        </>
    );
}

export default RentalUnitsForm;