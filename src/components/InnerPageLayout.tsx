import {Box, VStack} from "@chakra-ui/react";
import * as React from "react";

const InnerPageLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <Box
            bg="whiteAlpha.100"
            p={8}
            borderRadius="xl"
            boxShadow="lg"
            backdropFilter="blur(8px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            mb={12}
        >
            <VStack spacing={5}>{children}</VStack>
        </Box>
    );
};

export default InnerPageLayout;
