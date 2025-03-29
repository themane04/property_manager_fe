import {FormControl, FormLabel, Input, Select} from "@chakra-ui/react";
import {RentalContractFormProps} from "../../interfaces/rentalContractsInterfaces.ts";
import FormActionButton from "./FormActionButton.tsx";

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
                <FormLabel>Tenant</FormLabel>
                <Select
                    name="tenant"
                    value={form.tenant.first_name}
                    onChange={handleChange}
                    placeholder="Select tenant"
                >
                    {tenants.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.first_name} {t.last_name}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Rental Unit</FormLabel>
                <Select
                    name="rental_unit"
                    value={form.rental_unit.designation}
                    onChange={handleChange}
                    placeholder="Select rental unit"
                >
                    {rentalUnits.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.designation} – {u.type}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Start Of Contract</FormLabel>
                <Input type="date" name="start_of_contract" value={form.start_of_contract}
                       onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>End Of Contract</FormLabel>
                <Input type="date" name="end_of_contract" value={form.end_of_contract}
                       onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Rent</FormLabel>
                <Input name="rent" value={form.rent} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Deposit</FormLabel>
                <Input name="deposit" value={form.deposit} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    placeholder="Select status"
                >
                    <option value="active">active</option>
                    <option value="ended">ended</option>
                </Select>
            </FormControl>

            <FormActionButton
                handleSubmit={handleSubmit}
                editId={editId}
            />
        </>
    )
}

export default RentalContractsForm;