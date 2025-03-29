import {ReactNode} from "react";
import {Box} from "@chakra-ui/react";

const InnerPageLayout = ({children}: { children: ReactNode }) => {
    return (
        <Box bg="white" p={6} shadow="xl" borderRadius="md" mb={12}>
            {children}
        </Box>
    );
}

export default InnerPageLayout;