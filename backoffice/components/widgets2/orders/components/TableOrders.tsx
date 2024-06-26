import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FaEye } from 'react-icons/fa'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { TableHeader } from '@/components/ui/table/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/form-element/button'

const TableOrders = ({ orders }: any) => {
    const router = useRouter()
    const { slug } = router.query
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 8

    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRows = orders?.slice(indexOfFirstRow, indexOfLastRow)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil((orders?.length || 0) / rowsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className='p-10 pt-0'>
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Tele</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status Login</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentRows && currentRows.map((order: any, index: number) => (
                        <TableRow key={index} className="border-b border-gray-300">
                            <TableCell className="p-2 flex items-center ">
                                <Avatar>
                                    {/* <img src="" alt="User Avatar" /> */}
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5 text-sm">
                                    <div className="font-medium">{order.user_info.email}</div>
                                    <div className="text-gray-500 dark:text-gray-400"> {order.user_info.first_name} {order.user_info.last_name}</div>
                                </div>
                            </TableCell>
                            <TableCell className="p-2 ">{order.user_info.tele}</TableCell>
                            <TableCell className="p-2 ">{order.products[0].product_name}</TableCell>
                            <TableCell className="p-2 ">{order.products[0].price * order.products[0].quantity}</TableCell>
                            <TableCell className='p-2 '> <span className={`text-center px-2 py-1  ${order.status === 'DELIVERED' ? 'text-green-300 font-normal  bg-green-100 rounded-2xl ' : 'text-red-300 bg-red-100 rounded-2xl'}`}> {order.status}</span></TableCell>
                            <TableCell className="p-2 ">
                                <Link href={`/store/${slug}/orders/${order._id}`}>
                                    <FaEye />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-center mt-4">
                {pageNumbers.map(number => (
                    <Button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        variant={currentPage === number ? "ghost" : "outline"}
                        className="mx-1"
                    >
                        {number}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default TableOrders