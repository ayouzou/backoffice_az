
import Link from "next/link"
interface Props {
    _id?: string
    logo?: string
    name?: string
    description?: string
    category?: string
    address?: string
    template?: 'XMTA' | 'RAYBAN'
    href?: string,
    created_at?: string

}
function formatDate(date: string) {
    const date_ = new Date(date);
    const formatted = date_.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    return formatted;
}
export default function CardsStores({ _id, name, description, created_at, category, address, template, href, logo }: Props) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
            <img
                alt="Store Image"
                className="w-full h-48 object-cover"
                height={300}
                src={logo}
                style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                }}
                width={400} />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{description}.</p>
                <div className="flex items-center space-x-2 mb-2">
                    <TagIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{category}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                    <LocateIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{address}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                    <LayoutTemplateIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{template}</span>
                </div>
                <div className="flex justify-between">
                    <Link className="text-primary hover:underline" href={`/store/${href}`}>
                        Visit Store
                    </Link>
                    <span className="text-sm text-gray-500 dark:text-gray-400"> {formatDate(created_at as string)}</span>
                </div>

            </div>
        </div>
    )
}

function LayoutTemplateIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="7" x="3" y="3" rx="1" />
            <rect width="9" height="7" x="3" y="14" rx="1" />
            <rect width="5" height="7" x="16" y="14" rx="1" />
        </svg>
    )
}


function LocateIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="2" x2="5" y1="12" y2="12" />
            <line x1="19" x2="22" y1="12" y2="12" />
            <line x1="12" x2="12" y1="2" y2="5" />
            <line x1="12" x2="12" y1="19" y2="22" />
            <circle cx="12" cy="12" r="7" />
        </svg>
    )
}


function TagIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
        </svg>
    )
}