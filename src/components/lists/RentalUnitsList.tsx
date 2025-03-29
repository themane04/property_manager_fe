import {Box, Text, VStack} from '@chakra-ui/react';
import {RentalUnitsListProps} from "../../interfaces/rentalUnitsInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import ListActionButtons from "./ListActionButtons.tsx";
import {
    listComponentBoxStyle,
    listComponentMainTextStyle,
    listComponentTextStyle,
    listComponentVStackStyle
} from "../../styles/ListComponentStyles.ts";

const RentalUnitsList = ({
                             title,
                             units,
                             handleEdit,
                             handleDelete,
                         }: RentalUnitsListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack sx={listComponentVStackStyle}>
                {units.map((unit) => (
                    <Box
                        key={unit.id}
                        sx={listComponentBoxStyle}
                    >
                        <Text sx={listComponentMainTextStyle}>
                            🏷️ {unit.designation}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            🏠 Type: {unit.type} | Rooms: {unit.number_of_rooms} | Area: {unit.area_m2} m²
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            💰 Rent: {unit.rent} | Status: {unit.status}
                        </Text>
                        <Text sx={listComponentTextStyle}>
                            📅 Available from: {unit.available_from}
                        </Text>
                        <ListActionButtons
                            item={unit}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </Box>
                ))}
            </VStack>
        </>
    );
};

export default RentalUnitsList;
