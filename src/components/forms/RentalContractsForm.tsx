import {FormControl, FormLabel, Input, Select, VStack} from "@chakra-ui/react";
import {RentalContractFormProps} from "../../interfaces/rentalContractsInterfaces.ts";
import FormActionButton from "./FormActionButton.tsx";
import {formInputStyle, formLabelStyle, formSelectStyle, formVStackStyle} from "../../styles/FormComponentStyles.ts";

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
            <VStack sx={formVStackStyle}>
                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Tenant</FormLabel>
                    <Select
                        name="tenant"
                        value={form.tenant.first_name}
                        onChange={handleChange}
                        placeholder="Select a tenant"
                        sx={formInputStyle}
                    >
                        {tenants.map((t) => (
                            <option
                                key={t.id}
                                value={t.id}
                                style={formSelectStyle}
                            >
                                {t.first_name} {t.last_name}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Rental Unit</FormLabel>
                    <Select
                        name="rental_unit"
                        value={form.rental_unit.designation}
                        onChange={handleChange}
                        placeholder="Select a rental unit"
                        sx={formInputStyle}
                    >
                        {rentalUnits.map((u) => (
                            <option
                                key={u.id}
                                value={u.id}
                                style={formSelectStyle}
                            >
                                {u.designation} – {u.type}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Start Of Contract</FormLabel>
                    <Input
                        type="date"
                        name="start_of_contract"
                        value={form.start_of_contract}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>End Of Contract</FormLabel>
                    <Input
                        type="date"
                        name="end_of_contract"
                        value={form.end_of_contract}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Rent</FormLabel>
                    <Input
                        name="rent"
                        value={form.rent}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Deposit</FormLabel>
                    <Input
                        name="deposit"
                        value={form.deposit}
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
                        <option
                            value="active"
                            style={formSelectStyle}
                        >
                            active
                        </option>
                        <option
                            value="ended"
                            style={formSelectStyle}
                        >
                            ended
                        </option>
                    </Select>
                </FormControl>

                <FormActionButton
                    handleSubmit={handleSubmit}
                    editId={editId}
                />
            </VStack>
        </>
    )
}

export default RentalContractsForm;