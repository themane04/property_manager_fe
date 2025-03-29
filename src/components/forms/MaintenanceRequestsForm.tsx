import {FormControl, FormLabel, Input, Select} from "@chakra-ui/react";
import {MaintenanceRequestsFormProps} from "../../interfaces/maintenanceRequestInterfaces.ts";
import FormActionButton from "./FormActionButton.tsx";

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
                <FormLabel>Rental Unit</FormLabel>
                <Select name="rental_unit" value={form.rental_unit} onChange={handleChange}>
                    {rentalUnits.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.designation}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input name="description" value={form.description} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select name="status" value={form.status} onChange={handleChange}>
                    <option value="open">open</option>
                    <option value="in progress">in progress</option>
                    <option value="done">done</option>
                    <option value="urgent">urgent</option>
                    <option value="closed">closed</option>
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Created At</FormLabel>
                <Input type="date" name="created_at" value={form.created_at} onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Assigned Craftsman</FormLabel>
                <Input
                    name="assigned_craftsman"
                    value={form.assigned_craftsman}
                    onChange={handleChange}
                />
            </FormControl>

            <FormActionButton
                handleSubmit={handleSubmit}
                editId={editId}
            />
        </>
    );
}

export default MaintenanceRequestsForm;