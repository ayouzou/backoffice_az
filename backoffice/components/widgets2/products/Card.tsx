import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import Badge from './components/Badge';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import { deleteProductById } from '@/components/widgets/products/api/deleteProductById';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LucideTrash } from 'lucide-react';

const Card = ({ product_name, description, price, images, _id, quantity_available }: any) => {
    const [openDelete, setOpenDelete] = useState(false)
    const param = useRouter()
    const { slug } = param.query
    return (
        <div className='h-[28rem] relative w-[17rem]  shadow-lg flex flex-col  '>
            <div className='h-52'>
                <img src={images[0]} className='rounded-sm h-full' alt="" />
            </div>
            <div className='p-3'>
                <div className='flex justify-between gap-2'>
                    <h1 className='text-lg truncate max-w-full'>{product_name}</h1>
                    <Badge quantity={quantity_available} />
                </div>
                <h1 className='text-xl pt-3 text-black font-semibold'>${price}</h1>
                <p className='pt-2 truncate'>{description}.</p>
                <div className='absolute top-[23rem] left-0 px-4 mt-6  w-full'>
                    <div className='flex justify-between  '>
                        <Link href={`/store/${slug}/products2/${_id}`} className='bg-black p-2 rounded cursor-pointer hover:bg-zinc-800'>
                            <FaEye className='text-white  ' />
                        </Link>
                        <div className='flex gap-1'>
                            <div className=' flex gap-1 '>
                                <div className='bg-black p-2 rounded cursor-pointer hover:bg-zinc-800'> <DeleteProduct productId={_id} />  </div>
                                <Link href={`/store/${slug}/update-products/${_id}`} className='bg-black p-2 rounded cursor-pointer hover:bg-zinc-800'><GrEdit className='text-white' /></Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* {
                openDelete && <DeleteProduct productId={_id} />
            } */}

        </div>
    )
}

export default Card

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