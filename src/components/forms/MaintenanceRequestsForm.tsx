import {FormControl, FormLabel, Input, Select, VStack} from "@chakra-ui/react";
import {MaintenanceRequestsFormProps} from "../../interfaces/maintenanceRequestInterfaces.ts";
import FormActionButton from "./FormActionButton.tsx";
import {formInputStyle, formLabelStyle, formSelectStyle, formVStackStyle} from "../../styles/FormComponentStyles.ts";

const MaintenanceRequestsForm = ({
                                     form,
                                     rentalUnits,
                                     handleChange,
                                     handleSubmit,
                                     editId,
                                 }: MaintenanceRequestsFormProps) => {
    return (
        <>
            <VStack sx={formVStackStyle}>
                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Rental Unit</FormLabel>
                    <Select
                        name="rental_unit"
                        value={form.rental_unit}
                        onChange={handleChange}
                        placeholder="Select a rental unit"
                        sx={formInputStyle}
                    >
                        {rentalUnits.map((u) => (
                            <option key={u.id} value={u.id} style={formSelectStyle}>
                                {u.designation}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Description</FormLabel>
                    <Input
                        name="description"
                        value={form.description}
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
                        <option value="open" style={formSelectStyle}>open</option>
                        <option value="in progress" style={formSelectStyle}>in progress</option>
                        <option value="done" style={formSelectStyle}>done</option>
                        <option value="urgent" style={formSelectStyle}>urgent</option>
                        <option value="closed" style={formSelectStyle}>closed</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Created At</FormLabel>
                    <Input
                        type="date"
                        name="created_at"
                        value={form.created_at}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel sx={formLabelStyle}>Assigned Craftsman</FormLabel>
                    <Input
                        name="assigned_craftsman"
                        value={form.assigned_craftsman}
                        onChange={handleChange}
                        sx={formInputStyle}
                    />
                </FormControl>

                <FormActionButton
                    handleSubmit={handleSubmit}
                    editId={editId}
                />
            </VStack>
        </>
    );
}

export default MaintenanceRequestsForm;