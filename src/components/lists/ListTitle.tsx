import {Heading} from "@chakra-ui/react";

const ListTitle = ({title}: { title: string }) => {
    return (
        <Heading
            size="md"
            mb={4}
        >
            {title}
        </Heading>
    );
}

export default ListTitle;