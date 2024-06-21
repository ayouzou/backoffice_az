import React from 'react'
import { useRouter } from 'next/router'
import LayoutDash from '@/components/layout/layout'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import CardProfileStore from '@/components/widgets/stores/cards/CardProfileStore'
import { getStoreBySlug } from '@/components/widgets/stores/api/getStoreBySlug'
import { useQuery } from '@tanstack/react-query'
import { getProductsByStoreSlug } from '@/components/widgets/products/api/getProductsByStoreSlug'
import { getOrdersByStoreId } from '@/components/widgets/orders/api/getOrdersByStoreId'
import useAuth from '@/hooks/useAuth'
import { BsChatSquareDots } from 'react-icons/bs'
import { getCustomersByStoreSlug } from '@/components/widgets2/customers/api/getCustomersByStoreSlug'

const index = () => {
    const { auth } = useAuth()
    const router = useRouter()
    const { slug } = router.query

    const { data: storeInfoData } = useQuery({ queryKey: ['STORE_INFO', slug], queryFn: () => getStoreBySlug({ slug }, auth) })
    const { data: productsData, isLoading, isError } = useQuery({ queryKey: ['STORE_PRODUCTS', slug], queryFn: () => getProductsByStoreSlug(slug, auth) })
    const { data: customers } = useQuery({ queryKey: ['STORE_CUSTOMERS', slug], queryFn: () => getCustomersByStoreSlug(slug, auth) })
    const { data: orders } = useQuery({ queryKey: ['STORE_ORDERS', slug], queryFn: () => getOrdersByStoreId({ storeId: storeInfoData?.storeInfo?.store?._id as string }, auth) })

    return (
        <LayoutDash>
            <div className="grid min-h-screen w-full overflow-hidden ">
                <div className="flex flex-col">
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                        <div >
                            <CardProfileStore />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                                    <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{productsData?.data && productsData?.data?.length}</div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                                    <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{customers?.data && customers?.data.length} </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">+19% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                                    <ShoppingCartIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {orders?.data && orders?.data?.filter((order: any) => order.status === 'DELIVERED').length}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">+19% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Unread Chats</CardTitle>
                                    <BsChatSquareDots className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {orders?.data && orders?.data?.filter((order: any) => order.status === 'DELIVERED').length}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Here gonna be Unread messages</p>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </LayoutDash>
    )
}

export default index


function DollarSignIcon(props: any) {
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
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}

function SearchIcon(props: any) {
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}

function Package2Icon(props: any) {
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
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
        </svg>
    )
}

function MoveHorizontalIcon(props: any) {
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
            <polyline points="18 8 22 12 18 16" />
            <polyline points="6 8 2 12 6 16" />
            <line x1="2" x2="22" y1="12" y2="12" />
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
