
import { LayoutTemplateIcon, LocateIcon, TagIcon } from "lucide-react"
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
