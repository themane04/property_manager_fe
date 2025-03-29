import {extendTheme, ThemeConfig} from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({
    config,
    styles: {
        global: {
            'html, body': {
                bg: '#0f1117',
                color: 'gray.100',
                fontFamily: `'Inter', sans-serif`,
                lineHeight: 'base',
            },
            '*': {
                transition: 'all 0.2s ease-in-out',
            },
            a: {
                color: 'teal.300',
                _hover: {
                    color: 'teal.200',
                    textDecoration: 'underline',
                },
            },
            '::-webkit-scrollbar': {
                width: '8px',
            },
            '::-webkit-scrollbar-thumb': {
                background: 'gray.700',
                borderRadius: '8px',
            },
            '::-webkit-scrollbar-track': {
                background: 'gray.900',
            },
        },
    },
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: 'xl',
            },
        },
        Input: {
            baseStyle: {
                field: {
                    borderRadius: 'md',
                },
            },
        },
        Select: {
            baseStyle: {
                field: {
                    borderRadius: 'md',
                },
            },
        },
        Modal: {
            baseStyle: {
                dialog: {
                    borderRadius: 'xl',
                },
            },
        },
    },
})

export default theme
