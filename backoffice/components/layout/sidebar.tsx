import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { BsChatSquareDots } from "react-icons/bs";
import { MdDashboardCustomize } from 'react-icons/md';

const Sidebar = () => {
    const router = useRouter()
    const [openProduct, setOpenProduct] = useState(true)
    return (
        <div className='w-60  h-[48rem] border-r-2 '>
            <nav className="flex flex-col gap-y-4 mt-4 items-start px-4 text-sm font-medium">
                <Link className="flex items-center gap-3 rounded-lg px-10  pl-4 py-2 text-gray-900 bg-gray-100 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50"
                    href={`/store/${router.query.slug}`}
                >
                    <HomeIcon className="h-4 w-4" />
                    Overview
                </Link>
                <Link
                    className="flex items-center gap-3 rounded-lg px-10 pl-4 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`/store/${router.query.slug}/orders`}
                >
                    <ShoppingCartIcon className="h-4 w-4" />
                    Orders
                </Link>
                <Link
                    className="flex items-center gap-3 rounded-lg px-10 pl-4 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`/store/${router.query.slug}/customers`}
                >
                    <UsersIcon className="h-4 w-4" />
                    Customers
                </Link>
                <div className='w-full'>
                    <div className='flex items-center justify-between w-full ' onClick={() => setOpenProduct(!openProduct)}>
                        <div className='flex items-center w-full  gap-3 rounded-lg px-10 pl-4 py-2 text-gray-900 transition-all hover:text-gray-900 '>
                            <PackageIcon className="h-4 w-4" />
                            Products
                        </div>
                        {
                            openProduct ? <FaAngleUp /> : <FaAngleDown />
                        }
                    </div>
                    {
                        openProduct ?
                            <>
                                <Link
                                    className="flex items-center gap-3 hover:underline rounded-lg px-6 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    href={`/store/${router.query.slug}/products2`}>
                                    <PackageIcon className="h-4 w-4" />
                                    All products
                                </Link>
                                <Link
                                    className="flex items-center gap-3 rounded-lg px-5 hover:underline py-2 text-gray-900 transition-all hover:text-gray-900 "
                                    href={`/store/${router.query.slug}/create-products`}>
                                    <PackageIcon className="h-4 w-4" /> create products
                                </Link>
                            </> : ''
                    }
                </div>
                <Link className="flex items-center gap-3 rounded-lg px-10 pl-4 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`/store/${router.query.slug}/chats`}>
                    <BsChatSquareDots className="h-4 w-4" />
                    Chats
                </Link>
                <Link className="flex items-center gap-3 rounded-lg px-10 pl-4 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`/store/${router.query.slug}/apperances`}>
                    <MdDashboardCustomize className="h-4 w-4" />
                    Apperances
                </Link>
            </nav>
        </div>
    )
}
export default Sidebar

function HomeIcon(props: any) {
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}
function PackageIcon(props: any) {
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
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    )
}
function ShoppingCartIcon(props: any) {
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
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    )
}
function UsersIcon(props: any) {
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}