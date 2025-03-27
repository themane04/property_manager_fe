import {Button, SimpleGrid} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import {routes} from "../interfaces/routes.service.ts";
import PageLayout from "../components/PageLayout.tsx";

const MainPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <PageLayout title={'🏢 Property Manager – Übersicht'}>
                <SimpleGrid columns={[1, 2]} spacing={5}>
                    {routes.map((section) => (
                        <Button
                            key={section.path}
                            colorScheme="yellow"
                            size="lg"
                            onClick={() => navigate(section.path)}
                        >
                            {section.label}
                        </Button>
                    ))}
                </SimpleGrid>
            </PageLayout>
        </>
    )
}

export default MainPage
