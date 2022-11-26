export const defaultThemes = {
    default: {
        id: 'default',
        name: 'default',
        colors: {
            background: {
                first: { h: 176, s: 0.33, l: 0.9 },
                second: { h: 35, s: 0.88, l: 0.94 },
            },
            primary: { h: 192, s: 0.36, l: 0.5 },
            secondary: { h: 0, s: 0, l: 1 },
        },
    },

    dark: {
        id: 'dark',
        name: 'Default - Dark',
        colors: {
            background: {
                first: { h: 231, s: 0.09, l: 0.16 },
                second: { h: 231, s: 0.11, l: 0.12 },
            },
            primary: { h: 192, s: 1, l: 0.35 },
            secondary: { h: 192, s: 0.19, l: 0.24 }
        },
    },
}
