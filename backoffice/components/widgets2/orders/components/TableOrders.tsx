import React from 'react'
import { useRouter } from 'next/router'
import { FaEye } from 'react-icons/fa'
import Link from 'next/link'

const TableOrders = (orders: any) => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Client</th>
                        <th className="p-2">Tele</th>
                        <th className="p-2">Product_name</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.orders && orders?.orders.map((order: any, index: number) => (
                        <tr key={index} className="border-b border-gray-300">
                            <td className="p-2 text-center">{order.user_info.first_name} {order.user_info.last_name}</td>
                            <td className="p-2 text-center">{order.user_info.tele}</td>
                            <td className="p-2 text-center">{order.products[0].product_name}</td>
                            <td className="p-2 text-center">{order.products[0].price * order.products[0].quantity}</td>
                            <td className='p-2 text-center'> <span className={`text-center px-2 py-1  ${order.status === 'DELIVERED' ? 'text-green-300 font-normal  bg-green-100 rounded-2xl ' : 'text-red-300 bg-red-100 rounded-2xl'}`}> {order.status}</span></td>
                            <td className="p-2 text-center">
                                <Link href={`/store/${slug}/orders/${order._id}`}>
                                    <FaEye />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableOrders