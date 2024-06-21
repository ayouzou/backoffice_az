// components/ProductTable.js

import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import Badge from './components/Badge';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import { deleteProductById } from '@/components/widgets/products/api/deleteProductById';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LucideTrash } from 'lucide-react';

const ProductTable = (data: any) => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">Image</th>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Price</th>
                    <th className="py-2 px-4 text-left">Quantity</th>
                    <th className="py-2 px-4 text-left">Stock</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data?.data.map((product: any) => (
                    <tr key={product._id} className="border-t">
                        <td className="py-2 px-4"><img src={product.images[0]} className='w-14 h-14 rounded-xl' alt="" /></td>
                        <td className="py-2 px-4">{product.product_name}</td>
                        <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                        <td className="py-2 px-4">{product.quantity_available}</td>
                        <td className="py-2 px-4"><Badge quantity={product.quantity_available} /></td>
                        <td className="py-2 px-4">
                            <div className="flex gap-3">
                                <Link href={`/store/${slug}/products2/${product._id}`} className='bg-black p-2 rounded cursor-pointer hover:bg-zinc-800'>
                                    <FaEye className='text-white  ' />
                                </Link>
                                <div className='bg-black p-2 rounded cursor-pointer hover:bg-zinc-800'>
                                    {/* <MdDelete className='text-white  ' /> */}
                                    <DeleteProduct productId={product._id} />
                                </div>
                                <Link href={`/store/${slug}/update-products/${product._id}`} className='bg-black p-2 rounded cursor-pointer hover:bg-zinc-800'><GrEdit className='text-white  ' /></Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;

const DeleteProduct = ({ productId }: { productId: string }) => {

    const queryClient = useQueryClient()
    const { auth } = useAuth()
    const router = useRouter()
    const { slug } = router.query
    const { mutate } = useMutation({
        mutationFn: (data: Record<string, string>) => {
            return deleteProductById(data, auth)
        },
        onSettled(res) {
            if (!res?.error) {
                queryClient.invalidateQueries({ queryKey: ['STORE_PRODUCTS', slug] })
            }
        }
    })
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <LucideTrash className='cursor-pointer w-4 h-4 text-white' />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            product and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className='bg-red-900 text-white hover:bg-red-700' onClick={() => mutate({ id: productId })}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}