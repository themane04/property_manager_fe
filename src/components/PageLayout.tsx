import {Box, Heading} from "@chakra-ui/react";
import * as React from "react";

const PageLayout = ({title, children}: { title: string, children: React.ReactNode }) => {
    return (
        <Box
            p={8}
            maxW="800px"
            mx="auto"
        >
            <Heading
                mb={8}
                textAlign="center"
                color="blue.700"
            >
                {title}
            </Heading>
            {children}
        </Box>
    );
}

export default PageLayout;