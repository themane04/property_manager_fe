import {FeaturesListProps} from "../../interfaces/featuresInterfaces.ts";
import ListTitle from "./ListTitle.tsx";
import {Box, Text, VStack} from "@chakra-ui/react";
import ListActionButtons from "./ListActionButtons.tsx";
import {
    listComponentBoxStyle,
    listComponentMainTextStyle,
    listComponentVStackStyle
} from "../../styles/ListComponentStyles.ts";

const FeaturesList = ({
                          title,
                          features,
                          handleEdit,
                          handleDelete
                      }: FeaturesListProps) => {
    return (
        <>
            <ListTitle title={title}/>
            <VStack sx={listComponentVStackStyle}>
                {features.map((f) => (
                    <Box
                        key={f.id}
                        sx={listComponentBoxStyle}
                    >
                        <Text sx={listComponentMainTextStyle}>{f.name}</Text>
                        <ListActionButtons
                            item={f}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </Box>
                ))}
            </VStack>
        </>
    );
}

export default FeaturesList;