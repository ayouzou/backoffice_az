export const getStoreLink = (template: 'RAYBAN' | 'XMTA', slug: string) => {
    switch (template) {
        case 'RAYBAN':
            return `http://localhost:3002/${slug}`
        case 'XMTA':
            return `http://localhost:3002/${slug}`
        default:
            return `https://www.google.com/`
    }
}