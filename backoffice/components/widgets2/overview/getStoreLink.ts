// export const getStoreLink = (template: 'RAYBAN' | 'XMTA', slug: string) => {
//     switch (template) {
//         case 'RAYBAN':
//             return `http://localhost:3002/${slug}`
//         case 'XMTA':
//             return `http://localhost:3002/${slug}`
//         default:
//             return `https://www.google.com/`
//     }
// }

export const getStoreLink = (template: 'RAYBAN' | 'XMTA', slug: string) => {
    switch (template) {
        case 'RAYBAN':
            return `https://temp-1-az.vercel.app/${slug}`
        case 'XMTA':
            return `https://temp-1-az.vercel.app/${slug}`
        default:
            return `https://temp-1-az.vercel.app/${slug}`
    }
}