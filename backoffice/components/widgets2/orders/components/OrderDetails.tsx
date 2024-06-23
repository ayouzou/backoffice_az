import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { getOrderById } from '../api/getOrderById'
import { useRouter } from 'next/router'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { editOrderStatus } from '../api/editOrderStatus'
import { Button } from '@/components/form-element/button'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/Loading/Loading'

type Order = {
    images: string[],
    product_name: string,
    quantity: number,
    price: number

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
const OrderDetails = () => {
    const { auth } = useAuth()
    const router = useRouter()
    const { slug, id } = router.query
    const orderId = id
    const { data: order, isLoading } = useQuery({ queryKey: ['ORDER_ID', orderId], queryFn: () => getOrderById({ orderId }) })
    const [orderStatus, setOrderStatus] = React.useState<string>(order?.data?.status);

    const queryClient = useQueryClient()
    const { isPending, mutate: editStatus } = useMutation({
        mutationFn: (data: Record<string, string>) => {
            return editOrderStatus(data, auth)
        },
        onSettled(res) {
            if (!res?.error) {
                queryClient.invalidateQueries({ queryKey: ['ORDER_ID', orderId] })
            }
        }
    })
    const subtotal = order?.data?.products.reduce((total: number, item: any) => total + item.price * item.quantity, 0)
    const discount = subtotal * 0.1
    const total = subtotal - discount
    const items = order?.data?.products.reduce((totalItems: number, item: any) => totalItems + item.quantity, 0)

    const handleConfirm = () => {
        editStatus({ orderId: order?.data._id, status: orderStatus })
    }
    if (isLoading) {
        <div>
            Loading....
        </div>
    }
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col gap-y-5  gap-4 w-full p-10 '>
                <h1 className='text-center text-2xl'>Change Status Order </h1>
                <Card className='p-3 flex gap-10  w-full'>
                    <Select value={orderStatus} onValueChange={(status) => setOrderStatus(status)} >
                        <SelectTrigger id="framework">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                            <SelectItem value="DELIVERING">Delivering</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className='w-full' onClick={() => handleConfirm()} isLoading={isPending}>Confirm</Button>

                </Card>
            </div>
            {isLoading ?
                
                    <Loading />

                :
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Order #</span>
                                    <span className="font-medium">12345</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Order Date</span>
                                    <span className="font-medium">
                                        {formatDate(order?.data?.created_at as string)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Customer</span>
                                    <Link href="#" className="font-medium text-blue-600 hover:underline" prefetch={false}>
                                        {order?.data?.user_info.first_name} {order?.data?.user_info.last_name}
                                    </Link>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Items</span>
                                    <span className="font-medium">{items}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Total</span>
                                    <span className="font-medium">${total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Address</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2 text-sm">
                                <div><strong className='text-gray-500 dark:text-gray-400'>Name :</strong> {order?.data?.user_info.first_name} {order?.data?.user_info.last_name}</div>
                                <div><strong className='text-gray-500 dark:text-gray-400'>Address : </strong>{order?.data?.user_info.address}</div>
                                {/* <div>Anytown, CA 12345</div> */}
                                <div><strong className='text-gray-500 dark:text-gray-400'>Country :</strong> Morrocco</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Status</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Status</span>
                                    <Badge variant="secondary">{order?.data?.status}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Tracking</span>
                                    <Link href="#" className="font-medium text-blue-600 hover:underline" prefetch={false}>
                                        {order?.data?._id}
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Last Update</span>
                                    <span className="font-medium">{formatDate(order?.data?.updated_at as string)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className='w-full'>
                        <CardHeader>
                            <CardTitle>Items Purchased</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px] hidden md:table-cell">Image</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {order?.data?.products && order?.data?.products.map((item: Order, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="hidden md:table-cell">
                                                <img
                                                    src={item.images[0]}
                                                    width="64"
                                                    height="64"
                                                    alt="Product image"
                                                    className="aspect-square rounded-md object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{item.product_name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>${item.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </>
            }
        </div>
    )
}

export default OrderDetails