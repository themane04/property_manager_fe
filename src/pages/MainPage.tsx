import {Box, Card, CardBody, CardHeader, Heading, SimpleGrid, Text, VStack} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import {routes} from "../interfaces/routesService.ts";

const MainPage = () => {
    const navigate = useNavigate()

    return (
        <Box p={8}>
            <Heading
                mb={10}
                fontSize="3xl"
                textAlign="center"
            >
                🏢 Property Manager Dashboard
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {routes.map(({label, path, icon: Icon, color}) => (
                    <Card
                        key={path}
                        as="button"
                        onClick={() => navigate(path)}
                        bgGradient={`linear(to-br, ${color}.400, ${color}.600)`}
                        _hover={{transform: 'scale(1.03)', shadow: 'lg'}}
                        color="white"
                        transition="all 0.2s ease-in-out"
                        borderRadius="2xl"
                        h="170px"
                    >
                        <CardHeader>
                            <Icon size={28}/>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={1} align="start">
                                <Text fontSize="xl" fontWeight="bold">
                                    {label}
                                </Text>
                                <Text fontSize="sm" opacity={0.8}>
                                    Manage {label.toLowerCase()}
                                </Text>
                            </VStack>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    )
}

export default MainPage