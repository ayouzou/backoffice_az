import React from 'react'
import { useRouter } from 'next/router'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { getStoreBySlug } from '@/components/widgets/stores/api/getStoreBySlug'
import { useQuery } from '@tanstack/react-query'
import { getProductsByStoreSlug } from '@/components/widgets/products/api/getProductsByStoreSlug'
import { getOrdersByStoreId } from '@/components/widgets/orders/api/getOrdersByStoreId'
import useAuth from '@/hooks/useAuth'
import { BsChatSquareDots } from 'react-icons/bs'
import { getCustomersByStoreSlug } from '@/components/widgets2/customers/api/getCustomersByStoreSlug'
import { DollarSignIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react'
import Loading from '@/components/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const AnalyticOverview = () => {
    const { auth } = useAuth()
    const router = useRouter()
    const { slug } = router.query

    const { data: storeInfoData, isLoading } = useQuery({ queryKey: ['STORE_INFO', slug], queryFn: () => getStoreBySlug({ slug }, auth) })
    const { data: productsData } = useQuery({ queryKey: ['STORE_PRODUCTS', slug], queryFn: () => getProductsByStoreSlug(slug, auth) })
    const { data: customers } = useQuery({ queryKey: ['STORE_CUSTOMERS', slug], queryFn: () => getCustomersByStoreSlug(slug, auth) })
    const storeId = storeInfoData?.storeInfo?.store?._id as string
    const { data: orders } = useQuery({ queryKey: ['STORE_ORDERS', storeId], queryFn: () => getOrdersByStoreId({ storeId }, auth) })
    if (isLoading) {
        return <Loading />
    }
    return (
        <>

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
            <Card >
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                Olivia Martin
                            </p>
                            <p className="text-sm text-muted-foreground">
                                olivia.martin@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$1,999.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/02.png" alt="Avatar" />
                            <AvatarFallback>JL</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                Jackson Lee
                            </p>
                            <p className="text-sm text-muted-foreground">
                                jackson.lee@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/03.png" alt="Avatar" />
                            <AvatarFallback>IN</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                Isabella Nguyen
                            </p>
                            <p className="text-sm text-muted-foreground">
                                isabella.nguyen@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$299.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/04.png" alt="Avatar" />
                            <AvatarFallback>WK</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                William Kim
                            </p>
                            <p className="text-sm text-muted-foreground">
                                will@email.com
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+$99.00</div>
                    </div>
                   
                </CardContent>
            </Card>
        </>
    )
}

export default AnalyticOverview