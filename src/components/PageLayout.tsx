import {Box, Heading} from "@chakra-ui/react";
import * as React from "react";

const PageLayout = ({title, children}: { title: string; children: React.ReactNode }) => {
    return (
        <Box maxW="1000px" mx="auto" p={[4, 8]}>
            <Heading
                mb={10}
                textAlign="center"
                fontSize="3xl"
                color="teal.300"
                fontWeight="semibold"
            >
                {title}
            </Heading>
            {children}
        </Box>
    );
};

export default PageLayout;
