import { Input } from '@/components/form-element/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { IoHome } from 'react-icons/io5'
import TableOrders from './TableOrders'
import { getStoreBySlug } from '@/components/widgets/stores/api/getStoreBySlug'
import { getOrdersByStoreId } from '../api/getOrdersByStoreId'
import { useQuery } from '@tanstack/react-query'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/Loading/Loading'

const AllOrders = () => {
    const [selectedStatus, setSelectedStatus] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const router = useRouter()
    const { slug } = router.query
    const { auth } = useAuth()
    const { data: storeInfoData } = useQuery({ queryKey: ['STORE_INFO', slug], queryFn: () => getStoreBySlug({ slug }, auth) })
    const storeId = storeInfoData?.storeInfo?.store?._id as string
    const { data: orders, isLoading } = useQuery({ queryKey: ['STORE_ORDERS', storeId], queryFn: () => getOrdersByStoreId({ storeId }, auth) })
    const displayOrders = useMemo(() => {
        if (selectedStatus === 'all' || !selectedStatus) return orders?.data || []
        return orders?.data && orders.data.filter((order: any) => order?.status === selectedStatus)
    }, [orders, selectedStatus])

    const displayOrders2 = useMemo(() => {
        return displayOrders && displayOrders.slice(0, itemsPerPage)
    }, [displayOrders, itemsPerPage])
    return (
        <div className='w-full'>
            <Badge className='px-3 ml-3 text-2xl'>All-Orders</Badge>
            <div className='flex gap-2 items-center px-3 ml-3 mt-3'><IoHome /> <Link href={`/store/${slug}`}>Dashboard</Link> <FaChevronRight /> <h2>All Orders</h2></div>

            {
                isLoading ? <Loading /> :
                    <>
                        <div className='bg-white shadow-md h-20  mx-4 my-2 '>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-10 p-4">
                                    <p className="text-md text-gray-600   w-40">Filter Orders</p>
                                    <Select onValueChange={(value) => setSelectedStatus(value)} >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="all">ALL</SelectItem>
                                                <SelectItem value="PENDING">PENDING</SelectItem>
                                                <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                                                <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                                                <SelectItem value="DELIVERING">DELIVERING</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <div className="flex w-36  items-center space-x-2">
                                        <Input type="number" placeholder="Resullt on grid" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TableOrders orders={displayOrders2} />
                    </>
            }

        </div>
    )
}

export default AllOrders